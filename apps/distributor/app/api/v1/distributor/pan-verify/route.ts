import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

const panVerifyBodySchema = z.object({
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN format'),
});

/**
 * Mock PAN verification endpoint for distributor folio creation.
 * Validates the 10-character PAN payload and returns KYC holder metadata.
 * @param request Incoming POST request containing `{ pan }`.
 * @returns JSON envelope with verified PAN details or 400 validation error.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, code: 'INVALID_JSON', message: 'Request body must be valid JSON.' },
      { status: 400 },
    );
  }

  const parsed = panVerifyBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        code: 'INVALID_PAN',
        message: parsed.error.issues[0]?.message ?? 'Invalid PAN number.',
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      pan: parsed.data.pan,
      verified: true,
      holderName: 'RAHUL SHARMA',
      defaultAccountType: 'individual',
      defaultResidentialStatus: 'india',
    },
  });
}
