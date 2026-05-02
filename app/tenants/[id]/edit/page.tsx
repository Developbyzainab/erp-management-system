import pool from '@/lib/db';
import TenantForm from '../../components/TenantForm';
import { updateTenant } from '../../../actions/tenant';
import { notFound } from 'next/navigation';

export default async function EditTenantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let tenant = null;

  try {
    const result = await pool.query('SELECT * FROM erp_tenantes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return notFound();
    }
    tenant = result.rows[0];
  } catch (error) {
    console.error('Error fetching tenant for edit:', error);
    return notFound();
  }

  const updateTenantWithId = updateTenant.bind(null, id);

  return <TenantForm action={updateTenantWithId} initialData={tenant} title="Edit Tenant" />;
}
