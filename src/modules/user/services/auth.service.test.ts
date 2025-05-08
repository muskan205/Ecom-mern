import { AuthService } from '../services/AuthService';
import { Request, Response } from 'express';
import { Account } from '../../../entity/Account.entity';
import { test_Seller } from '../../../entity/test-seller';
import { test_User } from '../../../entity/test-user';
import { TokenService } from '../../../infra/utils/TokenUtil';
import { MailService } from '../../../infra/utils/sendMail'

// Mock dependencies
jest.mock('../../../infra/utils/TokenUtil');
jest.mock('../../../infra/utils/sendMail');

const mockAccountRepo = {
  findOneBy: jest.fn(),
  save: jest.fn(),
};
const mockSellerRepo = {
  save: jest.fn(),
};
const mockUserRepo = {
  save: jest.fn(),
};

// Mock AppDataSource
jest.mock('../../../infra/db/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn((entity) => {
      if (entity === Account) return mockAccountRepo;
      if (entity === test_Seller) return mockSellerRepo;
      if (entity === test_User) return mockUserRepo;
    }),
  },
}));

describe('AuthService', () => {
  let service: AuthService;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    service = new AuthService();
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        shopName: 'Test Shop',
        role: 'seller',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockAccountRepo.findOneBy.mockReset();
    mockAccountRepo.save.mockReset();
    mockSellerRepo.save.mockReset();
    mockUserRepo.save.mockReset();
  });

  it('should register a new seller account', async () => {
    mockAccountRepo.findOneBy.mockResolvedValue(null); // email doesn't exist
    mockAccountRepo.save.mockResolvedValue({ id: '123', ...req.body });
    mockSellerRepo.save.mockResolvedValue({ id: 'seller-id', username: 'testuser', shopName: 'Test Shop' });

    const result = await service.registration(req.body, req as Request, res as Response);

    expect(mockAccountRepo.findOneBy).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(mockAccountRepo.save).toHaveBeenCalled();
    expect(mockSellerRepo.save).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  it('should return 400 if email already exists', async () => {
    mockAccountRepo.findOneBy.mockResolvedValue({ email: 'test@example.com' }); 

    await service.registration(req.body, req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email already exists' });
  });
});
