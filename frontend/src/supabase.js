import { createClient } from '@supabase/supabase-js'
import { useSyncExternalStore } from 'react'

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
    return {data, error}
}


export async function logOut() {
  let { error } = await supabase.auth.signOut()
  return {error}
}


export async function sellItem(seller_id, item_name, item_desc, item_qnty, item_price) {
    const { data, error } = await supabase
        .from('sell_item')
        .insert([
            { 
                seller_id: seller_id,
                item_name: item_name,
                item_description: item_desc,
                item_quantity: item_qnty,
                item_price: item_price
            },
        ])
        .select()
    return {data, error}
}


export async function buyItem(buyer_id, item_id, qnty_brought) {
  const { data: itemData, error: itemError } = await supabase
    .from('sell_item')
    .select('item_quantity, quantity_sold')
    .eq('item_id', item_id)
    .single();

  if (itemError) {
    return { data: null, error: itemError };
  }

  const availableQty = itemData.item_quantity - itemData.quantity_sold;

  if (availableQty < qnty_brought) {
    return { data: null, error: "Not enough quantity available" };
  }

  const updatedQtySold = itemData.quantity_sold + qnty_brought;

  const { error: updateError } = await supabase
    .from('sell_item')
    .update({ quantity_sold: updatedQtySold })
    .eq('item_id', item_id);

  if (updateError) {
    return { data: null, error: updateError };
  }

  const { data, error } = await supabase
    .from('order_item')
    .insert([
      {
        item_id,
        buyer_id,
        quantity_brought: qnty_brought
      }
    ])
    .select();

  return { data, error };
}


export async function getAllItems() {
  const { data, error } = await supabase
    .from('sell_item')
    .select('*');

  return { data, error };
}


export async function getAllMyItems(seller_id) {
  const { data, error } = await supabase
    .from('sell_item')
    .select('*')
    .eq('seller_id', seller_id);

  return { data, error };
}

export async function getAllMyOrders(buyer_id) {
  const { data, error } = await supabase
    .from('order_item')
    .select('*')
    .eq('buyer_id', buyer_id);

  return { data, error };
}




export default supabase;