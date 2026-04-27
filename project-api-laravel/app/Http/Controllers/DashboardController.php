<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function CardsData()
    {
        $data = DB::select("call sp_get_dashboard_kpis()");
        return response()->json($data);
    }

    public function ChartGeneroData()
    {
        $data = DB::select("call sp_get_conteo_genero()");
        return response()->json($data);
    }

    public function ChartSangreData()
    {
        $data = DB::select("call sp_get_conteo_sangre()");
        return response()->json($data);
    }
}
