import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

const panQuerySchema = z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN parameter');

/**
 * Mock FATCA KYC lookup endpoint returning prefilled regulatory and personal declarations for a verified PAN.
 * @param request Incoming GET request with `?pan=<PAN>` query parameter.
 * @returns JSON envelope with FATCA compliance defaults or 400 validation error.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const rawPan = request.nextUrl.searchParams.get('pan') ?? '';
  const parsed = panQuerySchema.safeParse(rawPan.toUpperCase());

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        code: 'INVALID_PAN',
        message: parsed.error.issues[0]?.message ?? 'Valid PAN is required.',
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      occupation: 'Salaried – Private Sector',
      sourceOfIncome: 'Salary / Wages',
      incomeBracket: '₹5 – 10 Lakhs',
      isPep: false,
      taxedAbroad: false,
      nationality: 'Indian',
      placeOfBirth: 'Mumbai',
      countryOfBirth: 'India',
      taxAddress: '',
      taxEntries: [
        {
          country: '',
          tin: '',
          noTin: false,
          noTinReason: '',
          otherReason: '',
        },
      ],
      fatcaConsent: false,
    },
  });
}
