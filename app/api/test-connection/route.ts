import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Test 1: Check if we can connect
    const result = await pool.query('SELECT NOW() as current_time');
    
    // Test 2: Check tenants table
    const tenants = await pool.query('SELECT COUNT(*) FROM erp_tenantes');
    
    // Test 3: Check users table
    const users = await pool.query('SELECT COUNT(*) FROM sys_users');
    
    return NextResponse.json({
      success: true,
      database: 'Connected',
      currentTime: result.rows[0].current_time,
      tenantsCount: tenants.rows[0].count,
      usersCount: users.rows[0].count,
      dbHost: process.env.DB_HOST,
      dbName: process.env.DB_NAME,
    });
  } catch (error) {
    console.error('Connection error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      dbHost: process.env.DB_HOST,
      dbName: process.env.DB_NAME,
    }, { status: 500 });
  }
}