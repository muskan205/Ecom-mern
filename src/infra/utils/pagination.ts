import { PaginationOptions, PaginationResult } from './dto/pagination.interface';

export async function paginate<T>(
  query: PaginationOptions
): Promise<PaginationResult<T>> {
  const { page, limit, repository } = query;

  const skip = (page - 1) * limit;
  const [data, totalItems] = await repository.findAndCount({
    skip,
    take: limit,
  });

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    total: totalItems,
    page,
    limit,
    totalPages,
  };
}
