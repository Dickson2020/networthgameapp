
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vviemvanlsxkhlcjrofx.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2aWVtdmFubHN4a2hsY2pyb2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5MjUxMjgsImV4cCI6MjAzMjUwMTEyOH0.WyzYnC4Rg9zMYT-T5pLVc6vMg58AN98SGpqbCnZzQNA"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase
