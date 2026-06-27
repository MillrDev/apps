import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rwudvjyhpeatgrxhbwwz.supabase.co";
const anonKey = "sb_publishable_sOnCeg_nsvmbLruFGS637Q_zFTiMSq3";

export const supabase = createClient(supabaseUrl, anonKey);
