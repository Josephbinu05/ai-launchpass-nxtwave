import { projects } from '@/data/projects';
import { ProjectResult } from '@/components/students';
import { notFound } from 'next/navigation';
export const dynamicParams=false;
export function generateStaticParams(){return projects.map(p=>({id:p.id}));}
export default async function ProjectPage({params}:{params:Promise<{id:string}>}){const {id}=await params;if(!projects.some(p=>p.id===id))notFound();return <ProjectResult id={id}/>;}
