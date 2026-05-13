import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

async function ensureTenantTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS erp_tenants (
      id BIGINT PRIMARY KEY,
      tenant_name VARCHAR(300) NOT NULL,
      tenant_code VARCHAR(100),
      tax_no VARCHAR(100),
      acc_no VARCHAR(100),
      contact_person VARCHAR(300),
      tel_phone VARCHAR(20),
      mobile VARCHAR(20),
      email VARCHAR(300),
      website VARCHAR(300),
      address VARCHAR(3000),
      shr_cnt_code VARCHAR(10),
      shr_cty_code VARCHAR(10),
      shr_cur_code VARCHAR(10),
      locked BOOLEAN DEFAULT false,
      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_by BIGINT,
      last_updated_date TIMESTAMP,
      last_updated_by BIGINT
    )
  `);
}

export async function GET(request: NextRequest) {
  try {
    await ensureTenantTable();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (id) {
      const result = await pool.query('SELECT * FROM erp_tenants WHERE id = $1', [id]);
      console.log('Fetched tenant by id:', result.rows[0]);
      return NextResponse.json(result.rows[0] || null);
    }
    
    const result = await pool.query('SELECT * FROM erp_tenants ORDER BY created_date DESC');
    console.log('Fetched all tenants:', result.rows.length);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch tenants' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureTenantTable();
    const formData = await request.formData();
    
    const id = Date.now();
    const tenant_name = formData.get('tenant_name') as string;
    
    console.log('Creating tenant:', { id, tenant_name });
    
    if (!tenant_name) {
      return NextResponse.json({ error: 'Tenant name is required' }, { status: 400 });
    }
    
    const tenant_code = formData.get('tenant_code') as string || '';
    const tax_no = formData.get('tax_no') as string || '';
    const acc_no = formData.get('acc_no') as string || '';
    const contact_person = formData.get('contact_person') as string || '';
    const tel_phone = formData.get('tel_phone') as string || '';
    const mobile = formData.get('mobile') as string || '';
    const email = formData.get('email') as string || '';
    const website = formData.get('website') as string || '';
    const address = formData.get('address') as string || '';
    const shr_cnt_code = formData.get('shr_cnt_code') as string || '';
    const shr_cty_code = formData.get('shr_cty_code') as string || '';
    const shr_cur_code = formData.get('shr_cur_code') as string || '';
    const locked = formData.get('locked') === '1' || formData.get('locked') === 'true';
    const created_by = formData.get('created_by') ? parseInt(formData.get('created_by') as string) : null;

    const query = `
      INSERT INTO erp_tenants (
        id, tenant_name, tenant_code, tax_no, acc_no, contact_person, 
        tel_phone, mobile, email, website, address, shr_cnt_code, 
        shr_cty_code, shr_cur_code, locked, created_by, created_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, CURRENT_TIMESTAMP)
    `;
    
    const values = [
      id, tenant_name, tenant_code, tax_no, acc_no, contact_person, 
      tel_phone, mobile, email, website, address, shr_cnt_code, 
      shr_cty_code, shr_cur_code, locked, created_by
    ];
    
    await pool.query(query, values);
    console.log('Tenant created successfully:', id);
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('POST Error:', error);
    // ✅ FIXED: Safely access error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: 'Failed to create tenant: ' + errorMessage }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await ensureTenantTable();
    const formData = await request.formData();
    const id = formData.get('id') as string;
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const tenant_name = formData.get('tenant_name') as string;
    if (!tenant_name) {
      return NextResponse.json({ error: 'Tenant name is required' }, { status: 400 });
    }
    
    const tenant_code = formData.get('tenant_code') as string || '';
    const tax_no = formData.get('tax_no') as string || '';
    const acc_no = formData.get('acc_no') as string || '';
    const contact_person = formData.get('contact_person') as string || '';
    const tel_phone = formData.get('tel_phone') as string || '';
    const mobile = formData.get('mobile') as string || '';
    const email = formData.get('email') as string || '';
    const website = formData.get('website') as string || '';
    const address = formData.get('address') as string || '';
    const shr_cnt_code = formData.get('shr_cnt_code') as string || '';
    const shr_cty_code = formData.get('shr_cty_code') as string || '';
    const shr_cur_code = formData.get('shr_cur_code') as string || '';
    const locked = formData.get('locked') === '1' || formData.get('locked') === 'true';
    
    const query = `
      UPDATE erp_tenants SET
        tenant_name = $1, tenant_code = $2, tax_no = $3, acc_no = $4,
        contact_person = $5, tel_phone = $6, mobile = $7, email = $8,
        website = $9, address = $10, shr_cnt_code = $11, shr_cty_code = $12,
        shr_cur_code = $13, locked = $14, last_updated_date = CURRENT_TIMESTAMP
      WHERE id = $15
    `;
    
    const values = [tenant_name, tenant_code, tax_no, acc_no, contact_person, tel_phone, mobile, email, website, address, shr_cnt_code, shr_cty_code, shr_cur_code, locked, id];
    
    await pool.query(query, values);
    console.log('Tenant updated successfully:', id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: 'Failed to update tenant: ' + errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await ensureTenantTable();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    await pool.query('DELETE FROM erp_tenants WHERE id = $1', [id]);
    console.log('Tenant deleted successfully:', id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: 'Failed to delete tenant: ' + errorMessage }, { status: 500 });
  }
}