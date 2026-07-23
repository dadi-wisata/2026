const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Access-Control-Allow-Headers": "Content-Type",
};

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        
        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            if (url.pathname === "/api/members" && request.method === "GET") {
                const { results } = await env.DB.prepare("SELECT * FROM members ORDER BY created_at DESC").all();
                return new Response(JSON.stringify(results), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
            }

            if (url.pathname === "/api/members" && request.method === "POST") {
                const data = await request.json();
                await env.DB.prepare("INSERT INTO members (nama) VALUES (?)").bind(data.nama).run();
                return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
            }

            if (url.pathname === "/api/incomes" && request.method === "POST") {
                const data = await request.json();
                await env.DB.prepare(
                    "INSERT INTO incomes (member_id, jenis, metode, nominal, keterangan) VALUES (?, ?, ?, ?, ?)"
                ).bind(data.memberId || null, data.jenis, data.metode, data.nominal, data.keterangan || "").run();
                return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
            }

            if (url.pathname === "/api/expenses" && request.method === "POST") {
                const data = await request.json();
                await env.DB.prepare(
                    "INSERT INTO expenses (kategori, nominal, keterangan) VALUES (?, ?, ?)"
                ).bind(data.kategori, data.nominal, data.keterangan).run();
                return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
            }

            return new Response("Not Found", { status: 404, headers: corsHeaders });

        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), { 
                status: 500, 
                headers: { ...corsHeaders, "Content-Type": "application/json" } 
            });
        }
    }
};
