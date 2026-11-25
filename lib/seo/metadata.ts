import type { Metadata } from 'next';

interface MetadataInput {
  title: string;
  description: string;
  path: string;
}

/**
 * Builds standard metadata payload with canonical and Open Graph fields.
 * @param input Per-page metadata values.
 * @returns Metadata object usable in App Router pages.
 */
export function buildMetadata(input: MetadataInput): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.example.com';
  const canonical = new URL(input.path, baseUrl).toString();

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      type: 'website',
    },
  };
}
