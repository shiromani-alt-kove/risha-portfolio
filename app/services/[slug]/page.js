import { services, getServiceBySlug } from '@/lib/services';
import { notFound } from 'next/navigation';
import ServicePageClient from './ServicePageClient';

export async function generateStaticParams() {
  if (!services) return [];
  return services.map(s => ({ slug: s.id }));
}

export async function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: `${service.name} — Services`,
    description: service.shortDesc,
  };
}

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();
  
  return <ServicePageClient service={service} />;
}
