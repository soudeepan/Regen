import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://agqcrwknkygoqynlthhl.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncWNyd2tua3lnb3F5bmx0aGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4Njc5ODQsImV4cCI6MjA2NjQ0Mzk4NH0.2AL_HDabpLHS3k3YmgW-w-_xtceVOOCOFalj3eSNhC4"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function signUp(email, password) {
    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
        })
    return {data,error}
}

export async function login(email, password) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
        })
    return {data,error}
}

export default supabase;