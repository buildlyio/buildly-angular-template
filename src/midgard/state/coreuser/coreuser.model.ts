export interface CoreUser {
  id: number;
  user?: {
    id?: number;
    core_user_uuid?: string;
    is_super_user?: boolean;
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    is_staff?: boolean;
    groups?: string[];
    is_active?: boolean;
  };
  core_user_uuid?: string;
  title?: string;
  name?: string;
  contact_info?: string;
  privacy_disclaimer_accepted?: boolean;
  filter?: string;
  create_date?: string;
  edit_date?: string;
}
