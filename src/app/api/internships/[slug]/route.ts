import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const { data: internship, error } = await supabase
            .from('internships')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !internship) {
            return NextResponse.json({ error: 'Internship not found' }, { status: 404 });
        }

        return NextResponse.json({ internship });
    } catch (error) {
        console.error('Error fetching internship:', error);
        return NextResponse.json({ error: 'Failed to fetch internship' }, { status: 500 });
    }
}
