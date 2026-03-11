import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search')
    const platform = searchParams.get('platform')
    const location = searchParams.get('location')
    const remote = searchParams.get('remote')
    const category = searchParams.get('category')
    const expiring = searchParams.get('expiring')

    try {

        let query = supabase
            .from('internships')
            .select('*')
            .eq('is_active', true)

        /* ---------- SEARCH ---------- */

        if (search) {
            query = query.or(`title.ilike.%${search}%,company.ilike.%${search}%`)
        }


        /* ---------- PLATFORM FILTER ---------- */

        if (platform) {
            query = query.eq('platform', platform)
        }

        /* ---------- LOCATION FILTER ---------- */

        if (location) {
            query = query.ilike('location', `%${location}%`)
        }

        /* ---------- REMOTE FILTER ---------- */

        if (remote === 'true') {
            query = query.eq('remote', true)
        }

        /* ---------- CATEGORY FILTER ---------- */

        if (category) {
            query = query.eq('category', category)
        }

        /* ---------- EXPIRING INTERNSHIPS ---------- */

        if (expiring === 'true') {

            const now = new Date()
            const tomorrow = new Date()

            tomorrow.setHours(now.getHours() + 24)

            query = query
                .gte('deadline', now.toISOString())
                .lte('deadline', tomorrow.toISOString())
        }

        /* ---------- SORT ---------- */

        query = query.order('created_at', { ascending: false })

        const { data: internships, error } = await query

        if (error) throw error

        return NextResponse.json({ internships })

    } catch (error) {

        console.error('Error fetching internships:', error)

        return NextResponse.json(
            { error: 'Failed to fetch internships' },
            { status: 500 }
        )
    }
}