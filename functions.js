// Electron
const { app, BrowserWindow } = require('electron');
let mainWindow;
app.on('ready', () => {

    mainWindow = new BrowserWindow({

        icon:  'Icons/Logotipo 2.png',
        autoHideMenuBar: true,
    });
    mainWindow.maximize();
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    
});

// Open Tab
function openTab(evt, tabName){

    var i, tab_pane, tab_link;

    tab_pane = document.getElementsByClassName("tab_pane");
    for (i = 0; i < tab_pane.length; i++) {
        tab_pane[i].style.display = "none";
    }

    tab_link = document.getElementsByClassName("nav_link");
    for (i = 0; i < tab_link.length; i++) {
        tab_link[i].className = tab_link[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    document.getElementById('par_turb').style.display = "none";
    document.getElementById('divHidroeletrica').style.display = "none";
    
    let turb_rad = document.getElementsByClassName("labelturb");
    for (i = 0; i < turb_rad.length; i++) {
        turb_rad[i].style.display = "none";
    }

}

// Reports

function GenerateReport(Name, heightCanvas){

    const element = document.getElementById('report');
    var opt = {
        filename:     'ARA_Biosystems_'+Name+'.pdf',
        image:        { type: 'jpeg', quality: 1 },
        margin:        [top = 0, left = 0, bottom = 0, right = 0],
        html2canvas:    {height: heightCanvas}
    };

    html2pdf(element, opt)
}

// Air Conditioning

function DimensionarArCondicionado(el){

    var La = parseFloat(document.getElementById('La').value);
    document.getElementById('LaReport').innerHTML = La;
    var Ca = parseFloat(document.getElementById('Ca').value);
    document.getElementById('CaReport').innerHTML = Ca;
    var Area = La*Ca;

    var Qp = parseFloat(document.getElementById('Qp').value);
    document.getElementById('QpReport').innerHTML = Qp;
    var Ne = parseFloat(document.getElementById('Ne').value);
    document.getElementById('NeReport').innerHTML = Ne;
    var Nj = parseFloat(document.getElementById('Nj').value);
    document.getElementById('NjReport').innerHTML = Nj;

    if (document.getElementById("M/T").checked)
    {
        var Inc = 400;
        document.getElementById('localReport').innerHTML = "Morning / Afternoon";
    }
    else if(document.getElementById("Diatodo").checked)
    {
        var Inc = 800;
        document.getElementById('localReport').innerHTML = "All day";
    }
    else if(document.getElementById("Nenhuma").checked)
    {
        var Inc = 0;
        document.getElementById('localReport').innerHTML = "None";
    }

    var BTU = Inc + Area*600 + Qp*600 + Ne*600 + Nj*300;
    document.getElementById('BTU').innerHTML = BTU;
}

// Biodigester

function DimensionarBiodigester(el){

    var Na = parseFloat(document.getElementById('Na').value);
    document.getElementById("NaReport").innerHTML = Na;

    if (document.getElementById("Bovino").checked)
    {
        document.getElementById("AnimalReport").innerHTML = "Cattle";
        var estercodia = 25; //Em kg
        var agua = 1; //Em litros
        var densidade = 960; //kg/m3
        var tempo = 30; //dias
        var conversao = 0.04; //kg/m3
    }
    else if(document.getElementById("Suino").checked)
    {
        document.getElementById("AnimalReport").innerHTML = "Swine";
        var estercodia = 5.8; //Em kg
        var agua = 2; //Em litros
        var tempo = 35; //dias
        var densidade = 1010; //kg/m3
        var conversao = 0.35; //kg/m3
    }

    var massaesterco = Na * estercodia //total de kg de esterco por dia
    var litrosagua = agua * massaesterco; //litros de água por dia
    document.getElementById('La').innerHTML = litrosagua.toFixed(3);
    var volumediario = (litrosagua / 1000) + ( massaesterco / densidade ); //volume diário de esterco em m3
    var volumecaixa = volumediario * tempo; //volume total da caixa em m3
    if(volumecaixa < 500)
    {
        var H = 2.5;
    }
    else if(volumecaixa >= 500)
    {
        var H = 3.5;
    }

    document.getElementById('H').innerHTML = H.toFixed(3);
    var a = 5*H;
    var b = 5.46 * Math.pow(H,2);
    var c = 1.325*Math.pow(H,3) - volumecaixa;
    var delta = b * b - 4 * a * c;
    const x1 = (-b + Math.sqrt(delta)) / (2 * a);
    const x2 = (-b - Math.sqrt(delta)) / (2 * a);
    if(x1 > 0)
    {
        Bi = x1;
    }
    document.getElementById('Bi').innerHTML = Bi.toFixed(3);
    var Bs = 0.7279 * H + Bi;
    document.getElementById('Bs').innerHTML = Bs.toFixed(3);
    var L = 3.6395 * H + 5*Bi;
    document.getElementById('L').innerHTML = L.toFixed(3);

    var Ep = massaesterco * conversao;
    document.getElementById('Ep').innerHTML = Ep.toFixed(3);

    var At = Ep / L;
    var a1 = 120;
    var b1 = -Bi;
    var c1 = (Bi*2)-(2*At);
    var delta1 = b1 * b1 - 4 * a1 * c1;
    const x11 = (-b1 + Math.sqrt(delta1)) / (2 * a1);
    const x21 = (-b1 - Math.sqrt(delta1)) / (2 * a1);
    if(x11 > 0)
    {
        R = x11;
    }
    else if(x21 > 0)
    {
        R = x21;
    }
    var Alona = 2 * Math.PI * R * 0.333 * L;
    document.getElementById('Alona').innerHTML = Alona.toFixed(3);

    var Ce = Math.sqrt((volumediario*1.2),2);
    document.getElementById('Ce').innerHTML = Ce.toFixed(3);

    var Cs = Math.sqrt((volumediario*1.2*3),2);
    document.getElementById('Cs').innerHTML = Cs.toFixed(3);

}

// Center Pivot

function AparecerCanhao(){

    if (document.getElementById("canhao").checked){
        document.getElementById("inputcanhao").style.display = "block";
    }

    else {
        document.getElementById("inputcanhao").style.display = "none";
    }
}

function DimensionarPivo(el){
            
    const dComerciais = [0.025, 0.032, 0.035, 0.04, 0.05, 0.063, 0.075, 0.09, 0.1, 0.11, 0.125, 0.14, 0.15, 0.16, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5];

    // Lâmina de aplicação
    var Eto = parseFloat(document.getElementById('Eto').value);
    document.getElementById('EtoReport').innerHTML = Eto;
    var Kc = parseFloat(document.getElementById('Kc').value);
    document.getElementById('KcReport').innerHTML = Kc;
    
    var Lam = Eto * Kc;

    // Vazão total
    var tv = parseFloat(document.getElementById('tv').value);
    document.getElementById('tvReport').innerHTML = tv;
    var R = parseFloat(document.getElementById('R').value);
    document.getElementById('RReport').innerHTML = R;
    var Rasp = parseFloat(document.getElementById('Rasp').value);
    document.getElementById('RaspReport').innerHTML = Rasp;
    var Qcn = parseFloat(document.getElementById('Qcn').value);

    var Area = Math.PI * Math.pow((R + (Rasp/2)), 2);
    var Q = (Lam * Area ) / ( tv * 1000);

    var Qf = Q;
    if(document.getElementById("canhao").checked){
        Qf = Q + Qcn;
        document.getElementById('canhaoReport').innerHTML = "With Canon";
        document.getElementById('QcnReport').innerHTML = "Canon Flow rate (m3/h): " + Qcn.toString();
    }
    else{
        document.getElementById('canhaoReport').innerHTML = "Without Canon";
    }
    document.getElementById('Qf').innerHTML = Qf.toFixed(3);

    // Divisão do pivô em 4 partes
    var R1 = Math.sqrt(Area / ( 4 * Math.PI ));
    var R2 = Math.sqrt(Area / ( 2 * Math.PI ));
    var R3 = Math.sqrt((3*Area) / ( 4 * Math.PI ));
    var R4 = R;

    var L1 = R1;
    var L2 = R2 - R1;
    var L3 = R3 - R2;
    var L4 = R4 - R3;

    // Intensidade de Aplicação
    var Dasp = 2 * Rasp;
    
    var tr1 = (tv * Dasp) / ( 2 * Math.PI * (R1 / 2) );
    var tr2 = (tv * Dasp) / ( 2 * Math.PI * (R1 + (L2/2)) );
    var tr3 = (tv * Dasp) / ( 2 * Math.PI * (R2 + (L3/2)) );
    var tr4 = (tv * Dasp) / ( 2 * Math.PI * (R3 + (L4/2)) );

    Ia1 = Lam / tr1;
    Ia2 = Lam / tr2;
    Ia3 = Lam / tr3;
    Ia4 = Lam / tr4;

    const Resp = "The application intensity of each sprinkler (mm/h) from ";
    const Resp2 = " to the ";
    const Resp3 = " meters is ";

    var Ia1R = Resp + "0" + Resp2 + R1.toFixed(3).toString() + Resp3 + Ia1.toFixed(3).toString();
    var Ia2R = Resp + R1.toFixed(3).toString() + Resp2 + R2.toFixed(3).toString() + Resp3 + Ia2.toFixed(3).toString();
    var Ia3R = Resp + R2.toFixed(3).toString() + Resp2 + R3.toFixed(3).toString() + Resp3 + Ia3.toFixed(3).toString();
    var Ia4R = Resp + R3.toFixed(3).toString() + Resp2 + R4.toFixed(3).toString() + Resp3 + Ia4.toFixed(3).toString();

    document.getElementById('Ia1R').innerHTML = Ia1R;
    document.getElementById('Ia2R').innerHTML = Ia2R;
    document.getElementById('Ia3R').innerHTML = Ia3R;
    document.getElementById('Ia4R').innerHTML = Ia4R;

    // Vazão dos aspersores
    var Easp = parseFloat(document.getElementById('Easp').value);
    document.getElementById('EaspReport').innerHTML = Easp;

    var NaspL1 = L1 / Easp;
    var NaspL2 = L2 / Easp;
    var NaspL3 = L3 / Easp;
    var NaspL4 = L4 / Easp;

    var Qasp1 = (Q / 4) / NaspL1;
    var Qasp2 = (Q / 4) / NaspL2;
    var Qasp3 = (Q / 4) / NaspL3;
    var Qasp4 = (Q / 4) / NaspL4;

    const Resp4 = "The sprinkler flow (m3/h) from ";
    var Qa1R = Resp4 + "0" + Resp2 + R1.toFixed(3).toString() + Resp3 +  Qasp1.toFixed(3).toString();
    var Qa2R = Resp4 + R1.toFixed(3).toString() + Resp2 + R2.toFixed(3).toString() + Resp3 + Qasp2.toFixed(3).toString();
    var Qa3R = Resp4 + R2.toFixed(3).toString() + Resp2 + R3.toFixed(3).toString() + Resp3 + Qasp3.toFixed(3).toString();
    var Qa4R = Resp4 + R3.toFixed(3).toString() + Resp2 + R4.toFixed(3).toString() + Resp3 + Qasp4.toFixed(3).toString();

    document.getElementById('Qa1R').innerHTML = Qa1R;
    document.getElementById('Qa2R').innerHTML = Qa2R;
    document.getElementById('Qa3R').innerHTML = Qa3R;
    document.getElementById('Qa4R').innerHTML = Qa4R;

    // Pressões e perdas de carga
    var PS = parseFloat(document.getElementById('Pasp').value);
    document.getElementById('PaspReport').innerHTML = PS;
    let DZl = 0;

    var hfl;
    var Pinl;
    var Pfl;

    if (document.getElementById("Nivelp").checked)
    {
        hfl = 0.3*PS;
        Pinl = PS + ((3*hfl)/4);
        Pfl = PS - (hfl / 4);
        document.getElementById('PivoIncReport').innerHTML = "Pivot in level";
        document.getElementById('DhpReport').innerHTML = 0;
    }
    else if (document.getElementById("Aclivep").checked)
    {
        Dzl = parseFloat(document.getElementById('Dhp').value);
        document.getElementById('DhpReport').innerHTML = Dzl;
        hfl = 0.3*PS - DZl;
        if (Math.sign(hfl) == -1 || Math.sign(hfl) == 0)
        {
            hfl = DZl;
        }   
        Pinl = PS + ((3*hfl)/4)+ 0.5*DZl;
        Pfl = PS - (hfl / 4) - Dzl / 2;
        document.getElementById('PivoIncReport').innerHTML = "Pivot in uphill slope";
    }
    else if (document.getElementById("Declivep").checked)
    {
        Dzl = parseFloat(document.getElementById('Dhp').value);
        document.getElementById('DhpReport').innerHTML = Dzl;
        hfl = 0.3*PS + DZl;
        Pinl = PS + ((3*hfl)/4) - 0.5*DZl;
        Pfl = PS - (hfl / 4) + Dzl / 2;
        document.getElementById('PivoIncReport').innerHTML = "Pivot in downhill slope";
    }
    
    //F de cada parte
    var F1 = (1/(2.852))+(1/(2*parseInt(NaspL1)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(NaspL1),2)));
    var F2 = (1/(2.852))+(1/(2*parseInt(NaspL2)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(NaspL2),2)));
    var F3 = (1/(2.852))+(1/(2*parseInt(NaspL3)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(NaspL3),2)));
    var F4 = (1/(2.852))+(1/(2*parseInt(NaspL4)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(NaspL4),2)));
    
    // Diâmetro dos tubos de cada setor
    var Cp = parseFloat(document.getElementById('Cp').value);
    document.getElementById('CpReport').innerHTML = Cp;

    var Dt1 = Math.pow((10.643 * Math.pow((((Qf/4)/3600) / Cp),1.852) * (L1 / hfl) * F1), 0.205);
    const Dt1c = dComerciais.reduce((a, b) => {
                return Math.abs(b - Dt1) < Math.abs(a - Dt1) ? b : a;
            });
    var Dt2 = Math.pow((10.643 * Math.pow((((Qf/4)/3600) / Cp),1.852) * (L2 / hfl) * F2), 0.205);
    const Dt2c = dComerciais.reduce((a, b) => {
                return Math.abs(b - Dt2) < Math.abs(a - Dt2) ? b : a;
            });
    var Dt3 = Math.pow((10.643 * Math.pow((((Qf/4)/3600) / Cp),1.852) * (L3 / hfl) * F3), 0.205);
    const Dt3c = dComerciais.reduce((a, b) => {
                return Math.abs(b - Dt3) < Math.abs(a - Dt3) ? b : a;
            });
    var Dt4 = Math.pow((10.643 * Math.pow((((Qf/4)/3600) / Cp),1.852) * (L4 / hfl) * F4), 0.205);
    const Dt4c = dComerciais.reduce((a, b) => {
                return Math.abs(b - Dt4) < Math.abs(a - Dt4) ? b : a;
            });

    const Resp5 = "The diameter of the tubes (m) from ";
    var D1 = Resp5 + "0" + Resp2 + R1.toFixed(3).toString() + Resp3 + Dt1c.toString();
    var D2 = Resp5 + R1.toFixed(3).toString() + Resp2 + R2.toFixed(3).toString() + Resp3 + Dt2c.toString();
    var D3 = Resp5 + R2.toFixed(3).toString() + Resp2 + R3.toFixed(3).toString() + Resp3 + Dt3c.toString();
    var D4 = Resp5 + R3.toFixed(3).toString() + Resp2 + R.toFixed(3).toString() + Resp3 + Dt4c.toString();

    document.getElementById('D1').innerHTML = D1;
    document.getElementById('D2').innerHTML = D2;
    document.getElementById('D3').innerHTML = D3;
    document.getElementById('D4').innerHTML = D4;

    // Diâmetro da linha de sucção
    var Ls = parseFloat(document.getElementById('Ls').value);
    document.getElementById('LsReport').innerHTML = Ls;
    var VE = parseFloat(document.getElementById('VE').value);
    document.getElementById('VEReport').innerHTML = VE;

    var Ds = Math.sqrt(((4*(Qf/3600))/(Math.PI*VE)));
    const Dsc = dComerciais.reduce((a, b) => {
                return Math.abs(b - Ds) < Math.abs(a - Ds) ? b : a;
    });
    document.getElementById('Ds').innerHTML = Dsc;
    var Cs = parseFloat(document.getElementById('Cs').value);
    document.getElementById('CsReport').innerHTML = Cs;
    var hs = 10.643 * Math.pow((((Qf/3600))/Cs),1.852)*Math.pow(Dsc,-4.87)*Ls;

    let Dhs = 0;
    document.getElementById('DhsReport').innerHTML = Dhs;
    if (document.getElementById("Declives").checked)
    {
        Dhs = parseFloat(document.getElementById('Dhs').value) * -1;
        document.getElementById('DhsReport').innerHTML = Dhs * -1;
        document.getElementById('SuctionIncReport').innerHTML = "Suction in downhill slope";
    }
    else if (document.getElementById("Aclives").checked)
    {
        Dhs = parseFloat(document.getElementById('Dhs').value);
        document.getElementById('DhsReport').innerHTML = Dhs;
        document.getElementById('SuctionIncReport').innerHTML = "Suction in uphill slope";
    }
    else{
        document.getElementById('SuctionIncReport').innerHTML = "Suction in level";
    }
    // Bomba manométrica
    if(document.getElementById("canhao").checked){
        var Pcn = parseFloat(document.getElementById('Pcn').value);
        document.getElementById('PcnReport').innerHTML = "Canon Service pressure (mca): " + Pcn.toString();
        if(Pfl < Pcn){
            document.getElementById("warn").style.display = "block";
        }
        else if(Pfl => Pcn){
            document.getElementById("warn").style.display = "none";
        }
        var HMT = (Dhs + hs + hfl + Pinl + DZl + Pcn) * 1.05;
    }
    var HMT = (Dhs + hs + hfl + Pinl + DZl) * 1.05;
    var n = parseFloat(document.getElementById('n').value);
    document.getElementById('nReport').innerHTML = n;
    var Pot = ( ( (Qf*0.277778) * HMT) / ( 75 * n) ) * 1.1;
    document.getElementById('HMT').innerHTML = HMT.toFixed(3);
    document.getElementById('Pot').innerHTML = Pot.toFixed(3);
}

// Composting

function DimensionarComposting(el){
            
    //Cálculo das proporções C:N das adições
    let contador = controleCampoVeg;
    let limite = contador + 1;
    let sommass = 0;
    let relacn = 0;
    for(let i=0; i<limite; i++){

        let cnveg = 'cnveg'+i;
        let Reportcnveg = 'Reportcnveg'+i;
        let quantveg = 'quantveg'+i;
        let Reportquantveg = 'Reportquantveg'+i;
        let massveg = parseFloat(document.getElementById(quantveg).value);
        document.getElementById(Reportquantveg).innerHTML = massveg;
        let cn = parseFloat(document.getElementById(cnveg).value);
        document.getElementById(Reportcnveg).innerHTML = cn;
        let dia = 'dia'+i;
        let sem = 'sem'+i;
        let mes = 'mes'+i;
        let Reportfreq = "Reportfreq" + i;
        if(document.getElementById(dia).checked){
            massveg = massveg;
            document.getElementById(Reportfreq).innerHTML = "Daily addition";
        }
        else if(document.getElementById(sem).checked){
            massveg = massveg/7;
            document.getElementById(Reportfreq).innerHTML = "Weekly addition";
        }
        else if(document.getElementById(mes).checked){
            massveg = massveg/30;
            document.getElementById(Reportfreq).innerHTML = "Monthly addition";
        }
        let rela = massveg * cn;
        relacn = relacn + rela;
        sommass = sommass + massveg;
    }
    let propveg = relacn / sommass;
    // Aviso caso a mistura ja seja ideal
    let texto;
    if (27 < propveg && propveg < 34) {
        texto = "There is no need of straw addition";
        document.getElementById("warn").innerHTML = texto;
    }
    else{
        document.getElementById(el).style.display = "block";
    }

    // Calculo da quantidade de palhada
    let cnpal = parseFloat(document.getElementById('cnpal').value);
    document.getElementById('cnpalReport').innerHTML = cnpal;

    let mpal = ( (30*sommass - relacn) / (cnpal - 30 + 0.000000001))
    document.getElementById('mpal').innerHTML = mpal.toFixed(3);
}

//Dripping

function DimensionarDripping(el){
    const dComerciais = [0.025, 0.032, 0.035, 0.04, 0.05, 0.063, 0.075, 0.09, 0.1, 0.11, 0.125, 0.14, 0.15, 0.16, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5];
    
    //Manejo
    var occ = parseFloat(document.getElementById('CC').value);
    document.getElementById('CCReport').innerHTML = occ;
    var opmp = parseFloat(document.getElementById('PMP').value);
    document.getElementById('PMPReport').innerHTML = opmp;
    var Z = parseFloat(document.getElementById('Z').value);
    document.getElementById('ZReport').innerHTML = Z;
    var f = parseFloat(document.getElementById('f').value);
    document.getElementById('fReport').innerHTML = f;
    var ADR = (occ-opmp)*Z*(f/100)*10;
    var Kc = parseFloat(document.getElementById('KC').value);
    document.getElementById('KCReport').innerHTML = Kc;
    var Eto = parseFloat(document.getElementById('ETO').value);
    document.getElementById('ETOReport').innerHTML = Eto;
    var ETpc = Kc*Eto;
    var TR = ADR / ETpc;
    var Ea = parseFloat(document.getElementById('IR').value);
    document.getElementById('IRReport').innerHTML = Ea;
    Ea = Ea/100
    var ITN = ADR / Ea;
    var ID = ITN / TR;
    document.getElementById('ITN').innerHTML = ID.toFixed(3);
    var q = parseFloat(document.getElementById('VZ').value); //Vazão de um emissor
    document.getElementById('VZReport').innerHTML = q;
    var EE = parseFloat(document.getElementById('EE').value); //Espaçamento entre emissores
    document.getElementById('EEReport').innerHTML = EE;
    var Eel = parseFloat(document.getElementById('Eel').value); //Espaçamento entre linhas
    document.getElementById('EelReport').innerHTML = Eel;
    var TRD = ( ID * EE * Eel) / (q*1000);
    document.getElementById('TRD').innerHTML = TRD.toFixed(3);

    //Dimensionamento de Setores
    var CA = parseFloat(document.getElementById('CA').value); //Comprimento do local
    document.getElementById('CAReport').innerHTML = CA;
    var LA = parseFloat(document.getElementById('LA').value); //Largura do local
    document.getElementById('LAReport').innerHTML = LA;
    var Area = CA * LA; //Cálculo da área
    var Ns = parseFloat(document.getElementById('Ns').value); //Número de setores
    document.getElementById('NsReport').innerHTML = Ns;
    var Areasetores = Area / Ns; // Cálculo da área de cada setor
    var Comprimentosetor = CA / (Ns/2); //Comprimento de cada setor
    var Largurasetor = LA / 2; //Largura de cada setor

    //Dimensionamento das linhas laterais                
    var Tmg = ( ( Largurasetor / Eel) * Comprimentosetor ) * Ns; //Tamanho mangueiras de Dripping
    document.getElementById('Tmg').innerHTML = Tmg.toFixed(3);
    var PS = parseFloat(document.getElementById('PS').value); //Pressão de serviço
    document.getElementById('PSReport').innerHTML = PS;
    var DZl = parseFloat(document.getElementById('Decl').value); //Declividade da linha lateral

    if (document.getElementById("Nivell").checked)
    {
        document.getElementById('NivellReport').innerHTML = "Drip hoses in level";
        document.getElementById('DeclReport').innerHTML = 0;
        var hfl = 0.3*PS;
        var Pinl = PS + ((3*hfl)/4);
    }
    else if (document.getElementById("Aclivel").checked)
    {
        document.getElementById('NivellReport').innerHTML = "Drip hoses in uphill slope";
        document.getElementById('DeclReport').innerHTML = DZl;
        var hfl = 0.3*PS - DZl;
        if (Math.sign(hfl) == -1 || Math.sign(hfl) == 0)
        {
            hfl = DZl;
        }   
        var Pinl = PS + ((3*hfl)/4)+ 0.5*DZl;
    }
    else if (document.getElementById("Declivel").checked)
    {
        document.getElementById('NivellReport').innerHTML = "Drip hoses in downhill slope";
        document.getElementById('DeclReport').innerHTML = DZl;
        var hfl = 0.3*PS + DZl;
        var Pinl = PS + ((3*hfl)/4) - 0.5*DZl;
    }

    if (document.getElementById("Simm").checked)
    {
        document.getElementById('SimmReport').innerHTML = "Drips on hoses";
        document.getElementById('simConditional').style.display = "block";
        var Dm = parseFloat(document.getElementById('Dm').value); //Diâmetro interno da mangueira
        document.getElementById('DmReport').innerHTML = Dm;
        var Nspm = (Comprimentosetor / EE); //Número de saídas
        var Fl = (1/(2.852))+(1/(2*parseInt(Nspm)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(Nspm),2))); //Calculo do F da linha lateral
        var Qll = q * Math.round(Nspm); //Vazão de uma linha lateral
        var Cl = parseFloat(document.getElementById('Cl').value);  //C da linha lateral
        document.getElementById('ClReport').innerHTML = Cl;
        var hflme = 10.643 * Math.pow( (Qll / Cl), 1.85) * ( Comprimentosetor / Math.pow( Dm, 4.87) ); //Perda de carga da mangueira
        var Numlinhalateral = Largurasetor / Eel;
        var Qp = Numlinhalateral * q * Nspm;
    }
    if (document.getElementById("Naom").checked)
    {
        document.getElementById('gotnaoembutido').style.display = "block";
        document.getElementById('SimmReport').innerHTML = "Drips not included on hoses";
        var Nte = ( (Comprimentosetor / EE) * ( Largurasetor / Eel) ) * Ns; //Número total de emissores
        document.getElementById('Nte').innerHTML = Nte.toFixed(3);
        var Nspm = (Comprimentosetor / EE); //Número de saídas
        var Fl = (1/(2.852)) + (1/(2*parseInt(Nspm))) + (Math.sqrt(0.852)/(6*Math.pow(parseInt(Nspm),2))); //Calculo do F da linha lateral
        var Qll = q * Math.round(Nspm); //Vazão de uma linha lateral
        var Cl = parseFloat(document.getElementById('Cl').value);  //C da linha lateral
        document.getElementById('ClReport').innerHTML = Cl;
        var r = (Qll/3600) / Cl;
        var r1 = 10.643 * Math.pow(r,1.852) * (Comprimentosetor / hfl) * Fl;
        var Dl =  Math.pow(r1, 0.205);
        const Dlc = dComerciais.reduce((a, b) => {
                return Math.abs(b - Dl) < Math.abs(a - Dl) ? b : a;
        });
        document.getElementById('Dl').innerHTML = Dlc;
        var Numlinhalateral = Largurasetor / Eel;
        var Qp = Numlinhalateral * q * Nspm;
        var hflme = 10.643 * Math.pow(r, 1.852) * ( 1 / Math.pow(Dlc, 1.852) ) * Comprimentosetor * Fl;
    }

    //Dimensionamento da linha de derivação
    var Cd = Largurasetor; //Comprimento de uma linha de derivação
    var Ctd = Cd * Ns; //Comprimento total das linhas de derivação
    document.getElementById('Cmpd').innerHTML = Cd.toFixed(3);
    document.getElementById('Ctd').innerHTML = Ctd.toFixed(3);
    var Nsd = Largurasetor / Eel ; //Número de saídas de uma linha de derivação
    var Qd =  Nsd * Qll;
    document.getElementById('Qd').innerHTML = Qd.toFixed(3);
    var VE = parseFloat(document.getElementById('VE').value);
    document.getElementById('VEReport').innerHTML = VE;
    var Dd = Math.sqrt(((4*(Qd/3600))/(Math.PI*VE)));
    const Ddc = dComerciais.reduce((a, b) => {
                return Math.abs(b - Dd) < Math.abs(a - Dd) ? b : a;
    });
    document.getElementById('Dd').innerHTML = Ddc;
    var Cld = parseFloat(document.getElementById('Cd').value);
    document.getElementById('CdReport').innerHTML = Cld;
    var Fd = (1/(2.852))+(1/(2*parseInt(Nsd)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(Nsd),2))); //Calculo do F da linha de derivação
    var hd = 10.643 * Math.pow(((3*(Qd/3600))/Cld),1.852)*(Cd/Math.pow(Ddc,4.87))*Fd; //Perda de carga da linha de derivação

    //Dimensionamento da linha principal
    var Lp = CA - Comprimentosetor; //Largura da linha principal
    document.getElementById('Lp').innerHTML = Lp.toFixed(3);
    var Dp = Math.sqrt(((4*(Qp/3600))/(Math.PI*VE)));
    const Dpc = dComerciais.reduce((a, b) => {
                return Math.abs(b - Dp) < Math.abs(a - Dp) ? b : a;
    });
    document.getElementById('Dp').innerHTML = Dpc;
    var Cp = parseFloat(document.getElementById('Cp').value);
    document.getElementById('CpReport').innerHTML = Cp;
    var CLS = parseFloat(document.getElementById('CLS').value);
    document.getElementById('CLSReport').innerHTML = CLS;
    var Fp = (1/(2.852))+(1/(2*Ns))+(Math.sqrt(0.852)/(6*Math.pow(Ns,2)));
    var hp = 10.643 * Math.pow(((3*(Qp/3600))/Cp),1.852)*((Lp+CLS)/Math.pow(Dpc,4.87))*Fp;


    //Dimensionamento da motobomba
    var hs = parseFloat(document.getElementById('AS').value);
    document.getElementById('ASReport').innerHTML = hs;
    var hr = parseFloat(document.getElementById('AR').value);
    document.getElementById('ARReport').innerHTML = hr;
    var HMT = (hd + hp + hflme + Pinl + hr + hs)*1.1; //Altura manométrica total
    
    document.getElementById('Qp').innerHTML = Qp.toFixed(3);
    document.getElementById('HMT').innerHTML = HMT.toFixed(3);
    var RM = parseFloat(document.getElementById('RM').value);
    document.getElementById('RMReport').innerHTML = RM;
    var Pot = ( ( Qp / 3.6 ) * HMT ) / ( 75 * ( RM / 100 ) ); //Potência da motobomba
    document.getElementById('Pot').innerHTML = Pot.toFixed(3);

    //Dimensionamento do sistema de filtragem
    var SAF = (Qp * 1.1 ) / 60;
    document.getElementById('SAF').innerHTML = SAF.toFixed(3);
    var DF = Math.sqrt((4-SAF)/Math.PI);
    const DFc = dComerciais.reduce((a, b) => {
                return Math.abs(b - DF) < Math.abs(a - DF) ? b : a;
    });
    document.getElementById('DF').innerHTML = DFc;
}

// Economical Analysis

function Analisar(el){

    var Vi = parseFloat(document.getElementById('Vi').value);
    document.getElementById('ViReport').innerHTML = Vi;
    var Vo = parseFloat(document.getElementById('Ve').value);
    document.getElementById('VeReport').innerHTML = Vo;
    var Td = parseFloat(document.getElementById('Td').value);
    document.getElementById('TdReport').innerHTML = Td;
    var Go = parseFloat(document.getElementById('Go').value);
    document.getElementById('GoReport').innerHTML = Go;
    var Rla = parseFloat(document.getElementById('Rla').value);
    document.getElementById('RlaReport').innerHTML = Rla;

    var paySimples = Vi / Vo;
    document.getElementById('paySimples').innerHTML = paySimples.toFixed(1);

    let vectorPaySimples = [];
    let controlPaySimples = Vi;
    vectorPaySimples.push(Vi);
    for(i = 0; i<Math.ceil(paySimples); i++){
        controlPaySimples = controlPaySimples - Vo;
        vectorPaySimples.push(controlPaySimples);
    }

    var Von = Vo / (1 + (Td/100));
    var payDesco = Vi / Von;
    document.getElementById('payDesco').innerHTML = payDesco.toFixed(1);

    let vectorPayDesco = [];
    let vector = []
    let controlPayDesco = Vi;
    vectorPayDesco.push(Vi);
    for(i = 0; i<Math.ceil(payDesco); i++){
        controlPayDesco = controlPayDesco - Von;
        vectorPayDesco.push(controlPayDesco);
        vector.push(i)
    }
    vector.push(i)

    var Roi = (( Go - Vi ) / Vi) * 100;
    document.getElementById('Roi').innerHTML = Roi.toFixed(2);

    var Ren = (Rla / Vi) * 100;
    document.getElementById('Ren').innerHTML = Ren.toFixed(2);

    const labels = vector;
    const data = {
    labels: labels,
    datasets: [
        {
        label: 'Simple',
        data: vectorPaySimples,
        borderColor: 'rgb(255, 99, 132)'
        },
        {
        label: 'Discounted',
        data: vectorPayDesco,
        borderColor: 'rgb(58, 52, 235)'
        }
    ]
    };

    const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Simple payback vs Discounted'
        }
        }
    },
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

}

// Fogging

function DimensionarNebulizador(el){

    var Cv = parseFloat(document.getElementById("Cv").value);
    var Nv = parseFloat(document.getElementById("Nv").value);
    var Ee = parseFloat(document.getElementById("Ee").value);
    var Cn = parseFloat(document.getElementById("Cn").value);
    var Tbs = parseFloat(document.getElementById("Tbs").value);
    var Ur = parseFloat(document.getElementById("Ur").value);
    var Tpo = parseFloat(document.getElementById("Tpo").value);
    var H = parseFloat(document.getElementById("H").value);

    document.getElementById('CvReport').innerHTML = Cv;
    document.getElementById('NvReport').innerHTML = Nv;
    document.getElementById('EeReport').innerHTML = Ee;
    document.getElementById('CnReport').innerHTML = Cn;
    document.getElementById('TbsReport').innerHTML = Tbs;
    document.getElementById('UrReport').innerHTML = Ur;
    document.getElementById('TpoReport').innerHTML = Tpo;
    document.getElementById('HReport').innerHTML = H;

    var dbs = 1.2791 * Math.pow(Math.E, (-0.003*Tbs));
    var Pbs = (-1.0979 * H + 10091) / 10;
    var dbm = 1.2791 * Math.pow(Math.E, (-0.003*Tpo));
    var Pbm = (-1.0979 * H + 10091)/10;

    var Pvsbs = 0.6108*Math.pow(10, ((7.5*Tbs)/(237.3+Tbs)));
    var Pvbs = (Ur*Pvsbs) / 100;
    var wbs = (0.622 * Pvbs) / (Pbs-Pvbs);

    var Pvsbm = 0.6108*Math.pow(10, ((7.5*Tpo)/(237.3+Tpo)));
    var Pvbm = (100*Pvsbm) / 100;
    var wbm = (0.622 * Pvbm) / (Pbm - Pvbm);

    var dw = (wbm - wbs)*10;

    var N = (Ee * (Nv*Cv) *  dbs * dw * 0.01) / (Cn/60);
    document.getElementById('N').innerHTML = N.toFixed(3);
}

// Forced Ventilation

function DimensionarVentilacao(el){

    var C = document.getElementById("C").value;
    var L = document.getElementById("L").value;
    var H = document.getElementById("H").value;
    var Cv = document.getElementById("Cv").value;
    var Var = document.getElementById("Var").value;

    document.getElementById('CReport').innerHTML = C;
    document.getElementById('LReport').innerHTML = L;
    document.getElementById('HReport').innerHTML = H;
    document.getElementById('CvReport').innerHTML = Cv;
    document.getElementById('VarReport').innerHTML = Var;

    var N = ( L * H * Var * 60) / (Cv*0.9);
    document.getElementById('N').innerHTML = N.toFixed(3);

    var An = L * H;
    document.getElementById('An').innerHTML = An.toFixed(3);
}

// Hydroeletric

function MichellBlank(){
    if (document.getElementById("turbMichellBlank").checked){
        document.getElementById("MB_select").style.display = "block";
    }
    else{
        document.getElementById("MB_select").style.display = "none";
    }
}

function mudarParaParametro(evt, tabName){

    Pot = 0;
    Ns = 0;
    Q = parseFloat(document.getElementById('Q').value);
    document.getElementById('QReport').innerHTML = Q;
    H = parseFloat(document.getElementById('H').value);
    document.getElementById('HReport').innerHTML = H;
    N = parseFloat(document.getElementById('N').value);
    document.getElementById('NReport').innerHTML = N;
    n = parseFloat(document.getElementById('n').value);
    document.getElementById('nReport').innerHTML = n;

    Pot = Q * ( n / 100) * 1000 * H * 9.81 ;

    Ns = N * Math.pow(Pot, 0.5) * Math.pow(H, -1.25);

    document.getElementById('Pot').innerHTML = Pot.toFixed(3);
    document.getElementById('Ns').innerHTML = Ns.toFixed(3);

    var i, tab_pane, tab_link, tab_Name;

    tab_pane = document.getElementsByClassName("tab_pane");
    for (i = 0; i < tab_pane.length; i++) {
        tab_pane[i].style.display = "none";
    }

    tab_link = document.getElementsByClassName("nav_link");
    for (i = 0; i < tab_link.length; i++) {
        tab_link[i].className = tab_link[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    document.getElementById('par_turb').style.display = "block";
    document.getElementById('par_turb').className += " active";

    if(H >= 100 && 18 <= Ns && Ns <= 90 ){
        turbName = 'pelt';
        document.getElementById(turbName).style.display = "block";
    }
    else if(H >= 10 && H <= 450 && 70 <= Ns && Ns <= 450 ){
        turbName = 'fran';
        document.getElementById(turbName).style.display = "block";
    }
    else if(H >= 10 && H <= 70 && 250 <= Ns ){
        turbName = 'kap';
        document.getElementById(turbName).style.display = "block";
    }
    else if(H >= 10 && H <= 100 && 30 <= Ns && Ns <= 180 ){
        turbName = 'micbla';
        document.getElementById(turbName).style.display = "block";
    }

    tab_Name = document.getElementsByClassName("turbina");
    for (i = 0; i < tab_Name.length; i++) {
        tab_Name[i].style.display = "none";
    }

}

function DimensionarHydroeletric(el){

    let turbinaNome;
    let tabNome;

    if(document.getElementById("turbPelton").checked){
        turbinaNome = "Pelton";
        document.getElementById('turbReport').innerHTML = "Turbine choosen: Pelton";

        let Nji, Djip, Dmrp, Derp, Lpp, App, Epp, Npp, Pepp;

        if(Ns >= 18 && Ns <= 35){
            Nji = 1;
        }
        else if(Ns > 35 && Ns <= 50){
            Nji = 2;
        }
        else if(Ns > 50 && Ns <= 71){
            Nji = 4;
        }
        else if(Ns > 71 && Ns <= 90){
            Nji = 6;
        }
        document.getElementById("Nji").innerHTML = Nji.toFixed(3);
        
        Djip = 500*( Math.sqrt( (Q) / (Nji * Math.sqrt(H) ) ) );
        document.getElementById("Djip").innerHTML = Djip.toFixed(3);

        Dmrp = 38 * ( ( 1000 * Math.sqrt( H ) ) / N );
        document.getElementById("Dmrp").innerHTML = Dmrp.toFixed(3);

        App = 3.5 * Djip;
        document.getElementById("App").innerHTML = App.toFixed(3);

        Derp = Dmrp + 2 *( ( 3/5 ) * App);
        document.getElementById("Derp").innerHTML = Derp.toFixed(3);

        Lpp = 3.75 * Djip;
        document.getElementById("Lpp").innerHTML = Lpp.toFixed(3);

        Epp = 1.5 * Djip;
        document.getElementById("Epp").innerHTML = Epp.toFixed(3);

        Npp = ( 1/2 * ( Dmrp / Djip ) ) + 15;
        document.getElementById("Npp").innerHTML = Npp.toFixed(3);

        Pepp = ( Math.PI * Dmrp ) / Npp;
        document.getElementById("Pepp").innerHTML = Pepp.toFixed(3);

    }
    else if(document.getElementById("turbFrancis").checked){
        turbinaNome = "Francis";
        document.getElementById('turbReport').innerHTML = "Turbine choosen: Francis";
        let Tdtf, Dtsf, Vsf, Derf, Dirf, Lcdf, Npf;

        if(71 >= 18 && Ns <= 120){
            Tdtf = "Slow";
            Vsf = Math.sqrt( (2 * 9.8 * 0.04 * H ) / 100 );
            Dtsf = 1000 * Math.sqrt( (4 * Q) / ( Math.PI * Vsf) );
            Derf = Dtsf * ( 0.4 + ( 94.5 / Ns ) );
            Dirf = Dtsf * ( 0.96 + 0.00038 * Ns );
            Lcdf = Derf * ( ( ( ( Ns - 60 ) * 0.07 ) / 65 ) + 0.0995);
            Npf = 18 - ( ( Ns - 60 ) / 65 );
        }
        else if(Ns > 120 && Ns <= 200){
            Tdtf = "Normal";
            Vsf = Math.sqrt( (2 * 9.8 * 0.06 * H ) / 100 );
            Dtsf = 1000 * Math.sqrt( (4 * Q) / ( Math.PI * Vsf) );
            Derf = Dtsf * ( 0.4 + ( 94.5 / Ns ) );
            Dirf = Dtsf * ( 0.96 + 0.00038 * Ns );
            Lcdf = Derf * ( ( ( ( Ns - 125 ) * 0.15 ) / 100 ) + 0.225);
            Npf = 17 - ( ( ( Ns - 125 ) * 2 ) / 100 );
        }
        else if(Ns > 200 && Ns <= 300){
            Tdtf = "Fast";
            Vsf = Math.sqrt( (2 * 9.8 * 0.12 * H ) / 100 );
            Dtsf = 1000 * Math.sqrt( (4 * Q) / ( Math.PI * Vsf) );
            Derf = Dtsf * ( 0.4 + ( 94.5 / Ns ) );
            Dirf = Dtsf * ( 0.96 + 0.00038 * Ns );
            Lcdf = Derf * ( ( ( ( Ns - 225 ) * 0.22 ) / 125 ) + 0.2291);
            Npf = 15 - ( ( ( Ns - 225 ) * 2 ) / 125 );
        }
        else if(Ns > 300 && Ns <= 450){
            Tdtf = "Super-Fast";
            Vsf = Math.sqrt( (2 * 9.8 * 0.25 * H ) / 100 );
            Dtsf = 1000 * Math.sqrt( (4 * Q) / ( Math.PI * Vsf) );
            Derf = Dtsf * ( 0.4 + ( 94.5 / Ns ) );
            Dirf = Dtsf * ( 0.96 + 0.00038 * Ns );
            Lcdf = Derf * ( ( ( ( Ns - 125 ) * 0.19 ) / 100 ) + 0.35);
            Npf = 3 - ( ( Ns - 350 ) / 100 );
        }

        document.getElementById("Tdtf").innerHTML = Tdtf;
        document.getElementById("Vsf").innerHTML = Vsf.toFixed(3);
        document.getElementById("Dtsf").innerHTML = Dtsf.toFixed(3);
        document.getElementById("Derf").innerHTML = Derf.toFixed(3);
        document.getElementById("Dirf").innerHTML = Dirf.toFixed(3);
        document.getElementById("Lcdf").innerHTML = Lcdf.toFixed(3);
        document.getElementById("Npf").innerHTML = Npf.toFixed(3);

    }
    else if(document.getElementById("turbKaplan").checked){
        turbinaNome = "Kaplan";
        document.getElementById('turbReport').innerHTML = "Turbine choosen: Kaplan";
        let Dtsk, Vsk, Derk, Dirk, Dmrk, Lcek, Npk;

        Vsk = Math.sqrt( (2 * 9.8 * 0.3 * H ) / 100 );
        Dtsk = 1000 * Math.sqrt( (4 * Q) / ( Math.PI * Vsk) );
        document.getElementById("Vsk").innerHTML = Vsk.toFixed(3);
        document.getElementById("Dtsk").innerHTML = Dtsk.toFixed(3);

        Derk = 0.98*Dtsk;
        document.getElementById("Derk").innerHTML = Derk.toFixed(3);

        Dirk = Dtsk * ( 0.25 + ( 94.64 / Ns ) );
        document.getElementById("Dirk").innerHTML = Dirk.toFixed(3);

        Dmrk = Dirk + ( ( Derk - Dirk ) / 2 );
        document.getElementById("Dmrk").innerHTML = Dmrk.toFixed(3);

        let Cm1 = ( 4 * 0.8 * Q * Math.pow(10, 6) ) / ( ( Math.pow(Derk, 2) - Math.pow(Dirk, 2) ) * Math.PI );
        let Cmo = 0.65 * Cm1;
        Lcek = ( 0.8 * Q ) / ( 0.9 * Derk * Math.PI * Cmo );
        document.getElementById("Lcek").innerHTML = Lcek.toFixed(3);

        Npk = ( 2170 - ( 1.2 * Ns) ) / 250;
        document.getElementById("Npk").innerHTML = Npk.toFixed(3);
    }
    else if(document.getElementById("turbMichellBlank").checked){
        turbinaNome = "Michell-Blank";
        document.getElementById('turbReport').innerHTML = "Turbine choosen: Michell-Blank";
        let Derm, Dirm, Dim, Vim, Dmrm, Ejim, Varm, Vtm, Lrm, Npm, Lpm, Apm, Epm, Ppm;

        Derm = 38 * ( ( 1000 * Math.sqrt(H) ) / Ns );
        document.getElementById("Derm").innerHTML = Derm.toFixed(3);

        Dirm = 0.66 * Derm;
        document.getElementById("Dirm").innerHTML = Dirm.toFixed(3);

        Vim = 0.965 * Math.sqrt( 2 * 9.8 * H);
        document.getElementById("Vim").innerHTML = Vim.toFixed(3);

        Dim = 1000 * Math.sqrt( ( 4 * Q) / ( Vim * Math.PI ));
        document.getElementById("Dim").innerHTML = Dim.toFixed(3);

        Dmrm = ( Dirm + Derm ) / 2;
        document.getElementById("Dmrm").innerHTML = Dmrm.toFixed(3);

        let Ka, O;
        if(document.getElementById("60").checked){
            Ka = 0.1443;
            O = 60;
        }
        else if(document.getElementById("90").checked){
            Ka = 0.2164;
            O = 90;
        }
        else if(document.getElementById("120").checked){
            Ka = 0.2886;
            O = 120
        }
        Ejim = Ka * Derm;
        document.getElementById("Ejim").innerHTML = Ejim.toFixed(3);

        Vtm = 2.1 * Math.sqrt(H);
        document.getElementById("Vtm").innerHTML = Vtm.toFixed(3);

        Varm = 1000 * ( ( 60 * Vtm) / ( Derm * Math.PI ) );
        document.getElementById("Varm").innerHTML = Varm.toFixed(3);

        Lrm = 98.8 * ( Q / ( Derm * Math.sqrt(H) ) ) * ( 1000 / O);
        document.getElementById("Lrm").innerHTML = Lrm;

        Lpm = 2.8 * Dim;
        document.getElementById("Lpm").innerHTML = Lpm.toFixed(3);

        Apm = 3 * Dim;
        document.getElementById("Apm").innerHTML = Apm.toFixed(3);

        Epm = 0.8 * Dim;
        document.getElementById("Epm").innerHTML = Epm.toFixed(3);

        Ppm = Apm / 4.5;
        document.getElementById("Ppm").innerHTML = Ppm.toFixed(3);

        Npm = ( Math.PI * Derm ) / Ppm;
        document.getElementById("Npm").innerHTML = Npm.toFixed(3);
    }

    tab_Nome = document.getElementsByClassName("resultado");
    for (i = 0; i < tab_Nome.length; i++) {
        tab_Nome[i].style.display = "none";
    }
    document.getElementById(turbinaNome).style.display = "block";

}

// Micro Sprinkling

function DimensionarMicroAsp(el){

    const dComerciais = [0.025, 0.032, 0.035, 0.04, 0.05, 0.063, 0.075, 0.09, 0.1, 0.11, 0.125, 0.14, 0.15, 0.16, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5];

    //Cálculo da evapotranspiração
    var ECA = parseFloat(document.getElementById('ECA').value);
    document.getElementById('ECAReport').innerHTML = ECA;
    var Kp = parseFloat(document.getElementById('Kp').value);
    document.getElementById('KpReport').innerHTML = Kp;
    var ETo = ECA * Kp; //Evapotranspiração de referência
    var Kc = parseFloat(document.getElementById('Kc').value);
    document.getElementById('KcReport').innerHTML = Kc;
    var Etm = Kc * ETo; //Evapotranspiração máxima
    var Etg = parseFloat(document.getElementById('Kr').value); //Evapotranspiração reduzida para irrigação localizada
    document.getElementById('KrReport').innerHTML = Etg;

    //Cálculo do diâmetro molhado
    var n = parseFloat(document.getElementById('n').value);
    document.getElementById('nReport').innerHTML = n;
    var D = parseFloat(document.getElementById('DM').value);
    document.getElementById('DMReport').innerHTML = D;
    var AM = ( Math.PI * Math.pow(D,2) ) / 4 //Área molhada
    var Ep = parseFloat(document.getElementById('Ep').value);
    document.getElementById('EpReport').innerHTML = Ep;
    var El = parseFloat(document.getElementById('El').value);
    document.getElementById('ElReport').innerHTML = El;
    var Ate = Ep * El; //Área explorada
    var Pam =  (n*AM) / Ate; //Porcentagem de área molhada

    //Lâmina máxima de Irrigação
    var CC = parseFloat(document.getElementById('CC').value);
    document.getElementById('CCReport').innerHTML = CC;
    var PMP = parseFloat(document.getElementById('PMP').value);
    document.getElementById('PMPReport').innerHTML = PMP;
    var ds = parseFloat(document.getElementById('ds').value);
    document.getElementById('dsReport').innerHTML = ds;
    var Z = parseFloat(document.getElementById('PSR').value);
    document.getElementById('PSRReport').innerHTML = Z;
    var f = parseFloat(document.getElementById('f').value);
    document.getElementById('fReport').innerHTML = f;
    var hmax = (CC - PMP) * ds * Z * (f/100) * Pam; //Lâmina máxima de irrigação
    document.getElementById('hmax').innerHTML = hmax.toFixed(3);

    //Lâmina real de irrigação
    var Fmax = hmax / Etg; //Período máximo de irrigação
    document.getElementById('Fmax').innerHTML = Fmax.toFixed(3);

    //Tempo de Irrigação
    var q = parseFloat(document.getElementById('VZ').value);
    document.getElementById('VZReport').innerHTML = q;
    var Ee = parseFloat(document.getElementById('Ee').value);
    document.getElementById('EeReport').innerHTML = Ee;
    var T = ( hmax * Ee * El) / ( n * q * 1000);
    document.getElementById('T').innerHTML = T.toFixed(3);

    //Dimensionamento da linha lateral
    var L = parseFloat(document.getElementById('LA').value);
    document.getElementById('LAReport').innerHTML = L;
    var Ll = L / 8; //Tamanho de cada linha lateral
    var C = parseFloat(document.getElementById('CA').value);
    document.getElementById('CAReport').innerHTML = C;
    var Cl = C;
    document.getElementById('Ll').innerHTML = Ll.toFixed(3);
    var Ntll = (( Cl - (El/2) ) / El) * 2 * 4; //Número total de linhas laterais
    document.getElementById('Nll').innerHTML = Ntll.toFixed(3);
    var Ctll = Ntll * Ll; //Comprimento total das linhas laterais
    document.getElementById('Ctll').innerHTML = Ctll.toFixed(3);
    var Nall = ( Ll - (Ep/2) ) / Ep; //Número de aspersores da linha lateral
    document.getElementById('Nall').innerHTML = Nall.toFixed(3);
    var Ntma = Math.round(Ntll) * Math.round(Nall); //Número total de aspersores
    document.getElementById('Ntma').innerHTML = Ntma.toFixed(3);
    var PS = parseFloat(document.getElementById('PS').value);
    document.getElementById('PSReport').innerHTML = PS;
    var DZl = parseFloat(document.getElementById('Decl').value);
    document.getElementById('DeclReport').innerHTML = DZl;
    if (document.getElementById("NivelS").checked)
    {
        var hfl = 0.6*PS;
        var Pins = PS + ((3*hfs)/4);
        var Pfs = PS - 0.25*hfs;
        document.getElementById('NivelSReport').innerHTML = "Sideline in level";
    }
    else if (document.getElementById("AcliveS").checked)
    {
        var hfl = 0.6*PS - DZl;
        if (Math.sign(hfl) == -1 || Math.sign(hfl) == 0)
        {
            hfl = DZ;
        }
        var Pins = PS + ((3*hfl)/4)+ 0.5*DZl;
        var Pfs = PS - 0.25*hfl + 0.5*DZl;
        document.getElementById('NivelSReport').innerHTML = "Sideline in uphill slope";
    }
    else if (document.getElementById("DecliveS").checked)
    {
        var hfl = 0.6*PS + DZl;
        var Pins = PS + ((3*hfl)/4) - 0.5*DZl;
        var Pfs = PS - 0.25*hfl- 0.5*DZl;
        document.getElementById('NivelSReport').innerHTML = "Sideline in downhill slope";
    }
    var Fl = (1/(2.852))+(1/(2*parseInt(Nall)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(Nall),2))); //Calculo do F da linha lateral
    var Qll = q * Math.round(Nall); //Calculo da vazão total de uma linha lateral
    document.getElementById('Qll').innerHTML = Qll.toFixed(3);
    var Cll = parseFloat(document.getElementById('Cl').value);
    document.getElementById('ClReport').innerHTML = Cll;
    var r = (Qll/3600) / Cll;
    var r1 = 10.643 * Math.pow(r,1.852) * ( Ll / hfl) *Fl;
    var Dl =  Math.pow(r1, 0.205);
    const Dlc = dComerciais.reduce((a, b) => {
                return Math.abs(b - Dl) < Math.abs(a - Dl) ? b : a;
    });
    document.getElementById('Dl').innerHTML = Dlc;
    var hflc = 10.643 * Math.pow(r, 1.852) * ( 1 / Math.pow(Dlc, 1.852) ) * Ll * Fl;

    //Dimensionamento da linha de derivação
    var Cd = C - (El/2); //Comprimento de uma linha de derivação
    var Ctd = Cd * 4 //Comprimento total das linhas de derivação
    document.getElementById('Cmpd').innerHTML = Cd.toFixed(3);
    document.getElementById('Ctd').innerHTML = Ctd.toFixed(3);
    var Nsd = ( ( ( Cl - (El/2) ) / El ) * 2 ); //Número de saídas de uma linha de derivação
    var Qd =  Nsd * Qll;
    document.getElementById('Qd').innerHTML = Qd.toFixed(3);
    var VE = parseFloat(document.getElementById('VE').value);
    document.getElementById('VEReport').innerHTML = VE;
    var Dd = Math.sqrt(((4*(Qd/3600))/(Math.PI*VE)));
    const Ddc = dComerciais.reduce((a, b) => {
                return Math.abs(b - Dd) < Math.abs(a - Dd) ? b : a;
    });
    document.getElementById('Dd').innerHTML = Ddc;
    var Cld = parseFloat(document.getElementById('Cd').value);
    document.getElementById('CdReport').innerHTML = Cld;
    var Fd = (1/(2.852))+(1/(2*parseInt(Nsd)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(Nsd),2))); //Calculo do F da linha de derivação
    var hd = 10.643 * Math.pow(((3*(Qd/3600))/Cld),1.852)*(Cd/Math.pow(Ddc,4.87))*Fd; //Perda de carga da linha de derivação

    //Dimensionamento da linha principal
    var Lp = L - ( 2 * Ll); //Largura da linha principal
    document.getElementById('Lp').innerHTML = Lp.toFixed(3);
    var Qp = Ntma * q;
    var Dp = Math.sqrt(((4*(Qp/3600))/(Math.PI*VE)));
    const Dpc = dComerciais.reduce((a, b) => {
                return Math.abs(b - Dp) < Math.abs(a - Dp) ? b : a;
    });
    document.getElementById('Dp').innerHTML = Dpc;
    var Cp = parseFloat(document.getElementById('Cp').value);
    document.getElementById('CpReport').innerHTML = Cp;
    var CLS = parseFloat(document.getElementById('CLS').value);
    document.getElementById('CLSReport').innerHTML = CLS;
    var Fp = (1/(2.852))+(1/(2*4))+(Math.sqrt(0.852)/(6*Math.pow(4,2)));
    var hp = 10.643 * Math.pow(((3*(Qp/3600))/Cp),1.852)*((Lp+CLS)/Math.pow(Dpc,4.87))*Fp;

    //Dimensionamento da motobomba
    var hs = parseFloat(document.getElementById('AS').value);
    document.getElementById('ASReport').innerHTML = hs;
    var hr = parseFloat(document.getElementById('AR').value);
    document.getElementById('ARReport').innerHTML = hr;
    var HMT = (hd + hp + hflc + Pins + hr + hs)*1.1; //Altura manométrica total
    document.getElementById('Qp').innerHTML = Qp.toFixed(3);
    document.getElementById('HMT').innerHTML = HMT.toFixed(3);
    var RM = parseFloat(document.getElementById('RM').value);
    document.getElementById('RMReport').innerHTML = RM;
    var Pot = ( ( Qp / 3.6 ) * HMT ) / ( 75 * ( RM / 100 ) ); //Potência da motobomba
    document.getElementById('Pot').innerHTML = Pot.toFixed(3);
}

// Photovoltaic

function AparecerSolar(){

    if (document.getElementById("offgrid").checked){
        document.getElementById("inputoffgrid").style.display = "block";
    }

    else {
        document.getElementById("inputoffgrid").style.display = "none";
    }
}

function DimensionarSolar(el){

    var Pp = parseFloat(document.getElementById('Pp').value);
    document.getElementById('PpReport').innerHTML = Pp;
    var Ctd = parseFloat(document.getElementById('Ctm').value);
    document.getElementById('CtmReport').innerHTML = Ctd;
    Ctd = Ctd / 30 *1000 
    var Hspd = parseFloat(document.getElementById('Hspd').value);
    document.getElementById('HspdReport').innerHTML = Hspd;
    var Em = parseFloat(document.getElementById('Em').value);
    document.getElementById('EmReport').innerHTML = Em;

    if (document.getElementById("ongrid").checked)
    {
        var Pg = Ctd / Hspd;
        var PI = Pg + (Pg * (Em/100));
        document.getElementById('PI').innerHTML = PI.toFixed(3);
        var TRD = PI / Pp;
        document.getElementById('TRD').innerHTML = TRD.toFixed(3);
        document.getElementById('OnorOffReport').innerHTML = "On grid";
    }

    else if (document.getElementById("offgrid").checked)
    {
        document.getElementById("resultoffgrid").style.display = "block";
        document.getElementById("inputoffgridReport").style.display = "block";
        document.getElementById('OnorOffReport').innerHTML = "Off grid";
        var TM = parseFloat(document.getElementById('TM').value);
        document.getElementById('TMReport').innerHTML = TM;
        var Tbb = parseFloat(document.getElementById('Tbb').value);
        document.getElementById('TbbReport').innerHTML = Tbb;
        var Autonomia = parseFloat(document.getElementById('Autonomia').value);
        document.getElementById('AutonomiaReport').innerHTML = Autonomia
        var Cb = ( Ctd * Autonomia) / ( Tbb * 0.6);
        document.getElementById('Cb').innerHTML = Cb;
        var Fpp = Tbb / TM;
        var Pg = Ctd / (Hspd * 0.8 * Fpp);
        var PI = Pg + (Pg * (Em/100));
        var TRD = Pg / Pp;
        document.getElementById('TRD').innerHTML = TRD.toFixed(3);
        document.getElementById('PI').innerHTML = PI.toFixed(3);
        var Cc = (Pg * 1.1) / Tbb ;
        document.getElementById('Cc').innerHTML = Cc.toFixed(3);
    }

}

// Solar Heating

function DimensionarAquecimento(el){

    var contador = controleCampo;
    var limite = contador + 1;
    var Vcon = 0;
    //Cálculo do volume de consumo
    for(let i=0; i<limite; i++)
    {
        var vaz = 'vazao'+i;
        var Reportvaz = 'Reportvazao'+i;
        var temp = 'tempo'+i;
        var Reporttemp = 'Reporttempo'+i;
        var freq = 'frequencia'+i;
        var Reportfreq = 'Reportfrequencia'+i;
        var q = parseFloat(document.getElementById(vaz).value);
        document.getElementById(Reportvaz).innerHTML = q;
        var t = parseFloat(document.getElementById(temp).value);
        document.getElementById(Reporttemp).innerHTML = t;
        var f = parseFloat(document.getElementById(freq).value);
        document.getElementById(Reportfreq).innerHTML = f;
        var Vcon = ( (q / 1000) * ( t * 60 ) * f) + Vcon;
    }
    //Cálculo do volume do sistema de armazenamento
    var Tcon = parseFloat(document.getElementById('Tcon').value);
    document.getElementById('TconReport').innerHTML = Tcon;
    var Tamb = parseFloat(document.getElementById('Tamb').value);
    document.getElementById('TambReport').innerHTML = Tamb;
    var Varm = ( Vcon * (Tcon - Tamb) ) / ((1.1*Tcon) - Tamb);
    document.getElementById('Varm').innerHTML = Varm.toFixed(3);

    //Calculo da demanda de energia útil
    var Eutil = ( Varm * 1000 * 4.18 * ((1.1*Tcon) - Tamb)) / 3600;
    document.getElementById('Eutil').innerHTML = Eutil.toFixed(3) / 1000;

    //Cálculo da área coletora
    var Ecol = parseFloat(document.getElementById('Ecol').value);
    document.getElementById('EcolReport').innerHTML = Ecol;
    var Eperdas = Eutil * 0.15;
    var Area = ((Eutil + Eperdas)/1000) / ( Ecol / 30);
    document.getElementById('Area').innerHTML = Area.toFixed(3);
}

// Sprinkling

function DimensionarSprinkling(el){

    const dComerciais = [0.025, 0.032, 0.035, 0.04, 0.05, 0.063, 0.075, 0.09, 0.1, 0.11, 0.125, 0.14, 0.15, 0.16, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5];
    
    // Turno de Rega
    var occ = parseFloat(document.getElementById('CC').value);
    document.getElementById('CCReport').innerHTML = occ;
    var opmp = parseFloat(document.getElementById('PMP').value);
    document.getElementById('PMPReport').innerHTML = opmp;
    var Z = parseFloat(document.getElementById('Z').value);
    document.getElementById('ZReport').innerHTML = Z;
    var f = parseFloat(document.getElementById('f').value);
    document.getElementById('fReport').innerHTML = f;
    var ADR = (occ-opmp)*Z*(f/100)*10;
    var Kc = parseFloat(document.getElementById('KC').value);
    document.getElementById('KCReport').innerHTML = Kc;
    var Eto = parseFloat(document.getElementById('ETO').value);
    document.getElementById('ETOReport').innerHTML = Eto;
    var ETpc = Kc*Eto;
    var TR = ADR / ETpc;
    document.getElementById('TR').innerHTML = TR.toFixed(3);

    //Período de Irrigação
    var PI = Math.round(TR) - 1;
    document.getElementById('PI').innerHTML = PI.toFixed(3);

    // Lâmina Bruta de irrigação
    var Ea = parseFloat(document.getElementById('IR').value)
    document.getElementById('IRReport').innerHTML = Ea;
    Ea = Ea/100;
    var ITN = ADR / Ea;
    document.getElementById('ITN').innerHTML = ITN.toFixed(3);

    // Número de posições da linha lateral
    var CP = parseFloat(document.getElementById('CA').value);
    document.getElementById('CAReport').innerHTML = CP;
    var E2 = parseFloat(document.getElementById('E2').value);
    document.getElementById('E2Report').innerHTML = E2;
    var Npll = CP / E2;
    document.getElementById('Npll').innerHTML = Npll.toFixed(3);

    // Número de aspersores por lateral
    var Nplln = 2*parseInt(Npll);
    var E1 = parseFloat(document.getElementById('E1').value);
    document.getElementById('E1Report').innerHTML = E1;
    var Clp = (E2/2) + ((Nplln-1)*E2);
    var L = parseFloat(document.getElementById('LA').value);
    document.getElementById('LAReport').innerHTML = L;
    var Nal = (L/2) / E1;
    document.getElementById('Nal').innerHTML = Nal.toFixed(3);
    
    // Número de posições por dia
    var IA = parseFloat(document.getElementById('IA').value);
    document.getElementById('IAReport').innerHTML = IA;
    var Ti = ITN / IA;
    var Nh = parseFloat(document.getElementById('Nh').value);
    document.getElementById('NhReport').innerHTML = Nh;
    var Tm = parseFloat(document.getElementById('Tm').value);
    var n = (Nh)/(Ti + Tm);
    document.getElementById('n').innerHTML = n.toFixed(3);

    // Não sei
    var Np = Nplln / (PI);
    
    // Número de laterais em funcionamento simultâneo
    var NL = Np / n;
    document.getElementById('NL').innerHTML = NL.toFixed(3);

    // Vazão da linha lateral
    var qa = parseFloat(document.getElementById('VZ').value);
    document.getElementById('VZReport').innerHTML = qa;
    var Ql = qa*parseInt(Nal);
    document.getElementById('Qll').innerHTML = Ql.toFixed(3);

    // Vazão com troca de posições
    var QTS = Ql * NL;
    document.getElementById('QTS').innerHTML = QTS.toFixed(3);

    // Vazão total sem troca de posições
    var Qt = ( ( L*CP ) * ITN) / (PI*Nh*3600);
    document.getElementById('Qt').innerHTML = Qt.toFixed(3);

    // Vazão e perda de carga linha secundária
    var PS = parseFloat(document.getElementById('PS').value);
    document.getElementById('PSReport').innerHTML = PS;
    var Aa = parseFloat(document.getElementById('AA').value);
    document.getElementById('AAReport').innerHTML = Aa;
    var DZ = parseFloat(document.getElementById('Dec1').value);
    
    if (document.getElementById("NivelS").checked)
    {
        document.getElementById('Dec1Report').innerHTML = 0;
        document.getElementById('NivelSReport').innerHTML = "Secundary Line in Level";
        var hfs = 0.2*PS;
        var Pins = PS + ((3*hfs)/4) + Aa;
        var Pfs = PS - 0.25*hfs + Aa;
    }
    else if (document.getElementById("AcliveS").checked)
    {
        document.getElementById('Dec1Report').innerHTML = DZ;
        document.getElementById('NivelSReport').innerHTML = "Secundary Line in uphill slope";
        var hfs = 0.2*PS - DZ;
        if (Math.sign(hfs) == -1 || Math.sign(hfs) == 0)
        {
            hfs = DZ;
        }
        var Pins = PS + ((3*hfs)/4) + Aa + 0.5*DZ;
        var Pfs = PS - 0.25*hfs + Aa + 0.5*DZ;
    }
    else if (document.getElementById("DecliveS").checked)
    {
        document.getElementById('Dec1Report').innerHTML = DZ;
        document.getElementById('NivelSReport').innerHTML = "Secundary Line in downhill slope";
        var hfs = 0.2*PS + DZ;
        var Pins = PS + ((3*hfs)/4) + Aa - 0.5*DZ;
        var Pfs = PS - 0.25*hfs + Aa - 0.5*DZ;
    }
    document.getElementById('Pins').innerHTML = Pins.toFixed(3);

    // Comprimento da linha secundária
    var Cls = (parseInt(Nal)-1)*E1 + E1/2;
    document.getElementById('Cls').innerHTML = Cls.toFixed(3);

    // Diâmetro da linha secundária
    var F = (1/(1.852+1))+(1/(2*parseInt(Nal)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(Nal),2)));
    var Cs = parseFloat(document.getElementById('C2').value);
    document.getElementById('C2Report').innerHTML = Cs;
    var r = (Ql/3600) / Cs;
    var r1 = 10.643 * Math.pow(r,1.852)*((Cls*F)/hfs);
    var Ds =  Math.pow(r1, 0.205);
    const Dsc = dComerciais.reduce((a, b) => {
        return Math.abs(b - Ds) < Math.abs(a - Ds) ? b : a;
    });
    document.getElementById('Ds').innerHTML = Dsc;
    var hfsc= 10.643 * Math.pow(r, 1.852) * ( 1 / Math.pow(Dsc, 1.852) ) * Cls * F;

    // Linha principal, perda de carga e motobomba
    var CLS = parseFloat(document.getElementById('CLS').value);
    document.getElementById('CLSReport').innerHTML = CLS;
    var LLP = (parseInt(Npll)-1)*E2;
    var VE = parseFloat(document.getElementById('VE').value);
    document.getElementById('VEReport').innerHTML = VE;
    var Cp = parseFloat(document.getElementById('C1').value);
    document.getElementById('C1Report').innerHTML = Cp;
    var hs = parseFloat(document.getElementById('AS').value);
    document.getElementById('ASReport').innerHTML = hs;
    var hr = parseFloat(document.getElementById('AR').value);
    document.getElementById('ARReport').innerHTML = hr;
    var RM = parseFloat(document.getElementById('RM').value);
    document.getElementById('RMReport').innerHTML = RM;
    var Fp1 = (1/(1.852+1))+(1/(2*parseInt(Nplln)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(Nplln),2)));
    var Fp2 = (1/(1.852+1))+(1/(2*parseInt(NL)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(NL),2)));
    var Cmba = LLP + CLS;
    var Dmbac;
    if (document.getElementById("Sim").checked) 
    {
        document.getElementById('LaborReport').innerHTML = "Replacement of sprinklers in the area";
        document.getElementById('TmReport').innerHTML = Tm;
        document.getElementById('maodeobra').style.display = "block";
        document.getElementById('maodeobra1').style.display = "block";
        var Dmba = Math.sqrt(((4*(QTS/3600))/(Math.PI*VE)));
        Dmbac = dComerciais.reduce((a, b) => {
            return Math.abs(b - Dmba) < Math.abs(a - Dmba) ? b : a;
        });
        var hfmba = 10.643 * Math.pow(((3*(QTS/3600))/Cp),1.852)*(Cmba/Math.pow(Dmbac,4.87))*Fp2;
        var HMT = (hfmba + Pins + hr + hs + hfsc)*1.1;
        var Pot = ((QTS/3.6)*HMT)/(75*(RM/100));
    }
    else if (document.getElementById("Nao").checked)
    {
        document.getElementById('LaborReport').innerHTML = "No replacement of sprinklers in the area";
        document.getElementById('TmReport').innerHTML = 0;
        document.getElementById('vazaototal').style.display = "block";
        var a = (4* (Qt/1000) ) / (Math.PI*VE);
        var Dmba = Math.sqrt(a);
        Dmbac = dComerciais.reduce((a, b) => {
            return Math.abs(b - Dmba) < Math.abs(a - Dmba) ? b : a;
        });
        var hfmba = 10.643 * Math.pow(( (3* (Qt/1000) ) / Cp ), 1.852) * ( Cmba / (Math.pow(Dmbac,4.87)) * Fp1);
        var HMT = (hfmba + Pins + hr + hs + hfsc)*1.1;
        var Pot = (Qt*HMT)/(75*(RM/100));
    }
    document.getElementById('Dmba').innerHTML = Dmbac;
    document.getElementById('Cmba').innerHTML = Cmba.toFixed(3);
    document.getElementById('HMT').innerHTML = HMT.toFixed(3);
    document.getElementById('Pot').innerHTML = Pot.toFixed(3);
}

// Wind

function Aparecer(){
            
    if (document.getElementById("offgrid").checked){
        document.getElementById("inputoffgrid").style.display = "block";
    }

    else {
        document.getElementById("inputoffgrid").style.display = "none";
    }

}

function DimensionarWind(el){

    var Cmm = parseFloat(document.getElementById('Cmm').value);
    document.getElementById('CmmReport').innerHTML = Cmm;
    var Vv = parseFloat(document.getElementById('Vv').value);
    document.getElementById('VvReport').innerHTML = Vv;
    var Dp = parseFloat(document.getElementById('Dp').value);
    document.getElementById('DpReport').innerHTML = Dp;

    var Pd = (Cmm/30)*1000;
    var Area = Math.PI * Math.pow( (Dp/2), 2); 
    var Pae = ( 1.2754 * Area * Math.pow(Vv,3) ) / 2;
    var Paedia = Pae * 24;
    var Nae = Pd / Paedia;
    document.getElementById('Nae').innerHTML = Nae.toFixed(3);
    document.getElementById('PI').innerHTML = Pae * 1.3 * Nae.toFixed(3);

    if (document.getElementById("offgrid").checked)
    {
        document.getElementById("resultoffgrid").style.display = "block";
        document.getElementById('offoronReport').innerHTML = "Off Grid";
        document.getElementById("inputoffgridReport").style.display = "block";
        var TM = parseFloat(document.getElementById('TM').value);
        document.getElementById('TMReport').innerHTML = TM;
        var Tbb = parseFloat(document.getElementById('Tbb').value);
        document.getElementById('TbbReport').innerHTML = Tbb;
        var Autonomia = parseFloat(document.getElementById('Autonomia').value);
        document.getElementById('AutonomiaReport').innerHTML = Autonomia;
        var Cb = ( Pd * Autonomia) / ( Tbb * 0.6);
        document.getElementById('Cb').innerHTML = Cb.toFixed(3);
        var Cc = (Pd * 1.1) / Tbb ;
        document.getElementById('Cc').innerHTML = Cc.toFixed(3);
    }
    else{
        document.getElementById('offoronReport').innerHTML = "On Grid";
    }

}