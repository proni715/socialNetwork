import { PaginationQuery } from '../common/pagination.dto';

export class GetAllUsersQuery extends PaginationQuery {
  search?: string;
}
