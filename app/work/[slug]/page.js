import { projects, getProjectBySlug, getAdjacentProjects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import CaseStudyClient from './CaseStudyClient';

export async function generateStaticParams() {
  // Graceful fallback if projects array is missing during initial scaffold
  if (!projects) return [];
  return projects.map(p => ({ slug: p.id }));
}

export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — Case Study`,
    description: project.description,
  };
}

export default function CaseStudyPage({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  
  const { prev, next } = getAdjacentProjects(params.slug);
  return <CaseStudyClient project={project} prev={prev} next={next} />;
}
