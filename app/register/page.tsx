import { Suspense } from 'react';
import { Registration, LoadingState } from '@/components/students';
export default function RegisterPage(){return <Suspense fallback={<LoadingState/>}><Registration/></Suspense>;}
