import TenantForm from '../components/TenantForm';
import { createTenant } from '../../actions/tenant';

export default function CreateTenantPage() {
  return <TenantForm action={createTenant} title="Create Tenant" />;
}
