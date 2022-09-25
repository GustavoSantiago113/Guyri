const { app, BrowserWindow } = require('electron');
let mainWindow;
app.on('ready', () => {

    mainWindow = new BrowserWindow({

        icon:  'C:/Users/gusta/Desktop/Conhecimento/Projetos/ARA/LogotipoIcone.png',
        autoHideMenuBar: true,
    });
    mainWindow.maximize();
    mainWindow.loadURL(`file://${__dirname}/initial_page.html`)
    
});

var controleCampo;

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

}

function Adicionar(){

    controleCampo++;
    document.getElementById('formulario').insertAdjacentHTML('beforeend', '<div class="form-group" id="campo'+ controleCampo +'"><input class="input" type="text" id="vazao'+ controleCampo +'" placeholder = "Vazão do equipamento (l/s)"><br><input class="input" type="text" id="tempo'+ controleCampo +'" placeholder = "Tempo de uso (min)" ><br><input class="input" type="text" id="frequencia'+ controleCampo +'" placeholder ="Frequência diária de uso"><br><button type="button" class="numb_control" onclick="Adicionar()">+</button><button type="button" class="numb_control" onclick="Remover('+ controleCampo +')">-</button></div>');
    return(controleCampo);
}

function Remover(idCampo){

    controleCampo = controleCampo - 1;
    document.getElementById('campo' + idCampo).remove();
    return(controleCampo);
}

function DimensionarAquecimento(el){

    var div = document.getElementById(el);
    var disp = div.style.display;
    div.style.display = disp == 'none' ? 'block' : 'none';

    var contador = controleCampo;
    var limite = contador + 1;
    var Vcon = 0;
    console.log(limite);
    //Cálculo do volume de consumo
    for(let i=0; i<limite; i++)
    {
        var vaz = 'vazao'+i;
        var temp = 'tempo'+i;
        var freq = 'frequencia'+i;
        var q = parseFloat(document.getElementById(vaz).value);
        var t = parseFloat(document.getElementById(temp).value);
        var f = parseFloat(document.getElementById(freq).value);
        var Vcon = ( (q / 1000) * ( t * 60 ) * f) + Vcon;
    }
    //Cálculo do volume do sistema de armazenamento
    var Tcon = parseFloat(document.getElementById('Tcon').value);
    var Tamb = parseFloat(document.getElementById('Tamb').value);
    var Varm = ( Vcon * (Tcon - Tamb) ) / ((1.1*Tcon) - Tamb);
    document.getElementById('Varm').innerHTML = Varm;

    //Calculo da demanda de energia útil
    var Eutil = ( Varm * 1000 * 4.18 * ((1.1*Tcon) - Tamb)) / 3600;
    document.getElementById('Eutil').innerHTML = Eutil;

    //Cálculo da área coletora
    var Ig = parseFloat(document.getElementById('Ig').value);
    var Eperdas = Eutil * 0.15;
    var Frtan = parseFloat(document.getElementById('Frtan').value);
    var Frul = parseFloat(document.getElementById('Frul').value);
    var PMDEE = 4.901*(Frtan - (0.0249*Frul));
    var Ll = parseFloat(document.getElementById('Ll').value);
    var It = parseFloat(document.getElementById('It').value);
    var B = parseFloat(document.getElementById('B').value);
    var Fc = 1 / ( 1 - ( ( (1.2 * Math.pow(10,-4)) * Math.pow((It - Ll),2) ) + ( (3.5 * Math.pow(10,-5)) * Math.pow(B,2) ) ) );
    var Area = ( (Eutil + Eperdas) * Fc * 4.901 ) / ( PMDEE * Ig);
    document.getElementById('Area').innerHTML = Area;
}

function DimensionarArCondicionado(el){

    var div = document.getElementById(el);
    var disp = div.style.display;
    div.style.display = disp == 'none' ? 'block' : 'none';

    var La = parseFloat(document.getElementById('La').value);
    var Ca = parseFloat(document.getElementById('Ca').value);
    var Area = La*Ca;

    var Qp = parseFloat(document.getElementById('Qp').value);
    var Ne = parseFloat(document.getElementById('Ne').value);
    var Nj = parseFloat(document.getElementById('Nj').value);

    if (document.getElementById("M/T").checked)
    {
        var Inc = 400;
    }
    else if(document.getElementById("Diatodo").checked)
    {
        var Inc = 800;
    }
    else if(document.getElementById("Nenhuma").checked)
    {
        var Inc = 0;
    }

    var BTU = Inc + Area*600 + Qp*600 + Ne*600 + Nj*300;
    document.getElementById('BTU').innerHTML = BTU;
}

function DimensionarAspersao(el){

    var div = document.getElementById(el);
    var disp = div.style.display;
    div.style.display = disp == 'none' ? 'block' : 'none';
    var occ = parseFloat(document.getElementById('CC').value);
    var opmp = parseFloat(document.getElementById('PMP').value);
    var Z = parseFloat(document.getElementById('Z').value);
    var f = parseFloat(document.getElementById('f').value);
    var ADR = (occ-opmp)*Z*(f/100)*10;
    var Kc = parseFloat(document.getElementById('KC').value);
    var Eto = parseFloat(document.getElementById('ETO').value);
    var ETpc = Kc*Eto;
    var TR = ADR / ETpc;
    document.getElementById('TR').innerHTML = Math.round(TR);
    var PI = Math.round(TR) - 1;
    document.getElementById('PI').innerHTML = PI;
    var Ea = parseFloat(document.getElementById('IR').value)/100;
    var ITN = ADR / Ea;
    document.getElementById('ITN').innerHTML = ITN;
    var CP = parseFloat(document.getElementById('CA').value);
    var E2 = parseFloat(document.getElementById('E2').value);
    var Npll = CP / E2;
    var Nplln = 2*parseInt(Npll);
    var E1 = parseFloat(document.getElementById('E1').value);
    var Clp = (E2/2) + ((Nplln-1)*E2);
    var L = parseFloat(document.getElementById('LA').value);
    var Nal = (L/2) / E1;
    document.getElementById('Nal').innerHTML = Math.round(Nal);
    document.getElementById('Npll').innerHTML = Math.round(Npll);
    var IA = parseFloat(document.getElementById('IA').value);
    var Ti = ITN / IA;
    var Nh = parseFloat(document.getElementById('Nh').value);
    var Tm = parseFloat(document.getElementById('Tm').value);
    var n = (Nh)/(Ti + Tm);
    var Np = Nplln / (PI);
    document.getElementById('Np').innerHTML = Math.round(Np);
    document.getElementById('n').innerHTML = Math.round(n);
    var NL = Np / n;
    document.getElementById('NL').innerHTML = Math.round(NL);
    var qa = parseFloat(document.getElementById('VZ').value);
    var Ql = qa*parseInt(Nal);
    document.getElementById('Qll').innerHTML = Ql;
    var QTS = Ql * NL;
    document.getElementById('QTS').innerHTML = QTS; 
    var Qt = ( ( L*CP ) * ITN) / (PI*Nh*3600);
    document.getElementById('Qt').innerHTML = Qt;
    var PS = parseFloat(document.getElementById('PS').value);     
    var Aa = parseFloat(document.getElementById('AA').value);
    var DZ = parseFloat(document.getElementById('Dec1').value);
    if (document.getElementById("NivelS").checked)
    {
        var hfs = 0.2*PS;
        var Pins = PS + ((3*hfs)/4) + Aa;
        var Pfs = PS - 0.25*hfs + Aa;
    }
    else if (document.getElementById("AcliveS").checked)
    {
        var hfs = 0.2*PS - DZ;
        if (Math.sign(hfl) == -1 || Math.sign(hfl) == 0)
        {
            hfs = DZ;
        }
        var Pins = PS + ((3*hfs)/4) + Aa + 0.5*DZ;
        var Pfs = PS - 0.25*hfs + Aa + 0.5*DZ;
    }
    else if (document.getElementById("DecliveS").checked)
    {
        var hfs = 0.2*PS + DZ;
        var Pins = PS + ((3*hfs)/4) + Aa - 0.5*DZ;
        var Pfs = PS - 0.25*hfs + Aa - 0.5*DZ;
    }
    document.getElementById('Pins').innerHTML = Pins;
    var Cls = (parseInt(Nal)-1)*E1 + E1/2;
    document.getElementById('Cls').innerHTML = Cls;
    var F = (1/(1.852+1))+(1/(2*parseInt(Nal)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(Nal),2)));
    var Cs = parseFloat(document.getElementById('C2').value);
    var r = (Ql/3600) / Cs;
    var r1 = 10.643 * Math.pow(r,1.852)*((Cls*F)/hfs);
    var Ds =  Math.pow(r1, 0.205);
    document.getElementById('Ds').innerHTML = Ds;
    var CLS = parseFloat(document.getElementById('CLS').value);
    var LLP = (parseInt(Npll)-1)*E2;
    var VE = parseFloat(document.getElementById('VE').value);
    var Cp = parseFloat(document.getElementById('C1').value);
    var hs = parseFloat(document.getElementById('AS').value);
    var hr = parseFloat(document.getElementById('AR').value);
    var RM = parseFloat(document.getElementById('RM').value);
    var Fp1 = (1/(1.852+1))+(1/(2*parseInt(Nplln)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(Nplln),2)));
    var Fp2 = (1/(1.852+1))+(1/(2*parseInt(NL)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(NL),2)));
    var Cmba = LLP + CLS;
    if (document.getElementById("Sim").checked) 
    {
        var div = document.getElementById('maodeobra');
        var disp = div.style.display;
        div.style.display = disp == 'none' ? 'block' : 'none';
        var div1 = document.getElementById('maodeobra1');
        var disp1 = div1.style.display;
        div1.style.display = disp1 == 'none' ? 'block' : 'none';
        var Dmba = Math.sqrt(((4*(QTS/3600))/(Math.PI*VE)));
        var hfmba = 10.643 * Math.pow(((3*(QTS/3600))/Cp),1.852)*(Cmba/Math.pow(Dmba,4.87))*Fp2;
        var HMT = (hfmba + Pins + hr + hs)*1.1;
        var Pot = ((QTS/3.6)*HMT)/(75*(RM/100));
    }
    else if (document.getElementById("Nao").checked)
    {
        var div = document.getElementById('vazaototal');
        var disp = div.style.display;
        div.style.display = disp == 'none' ? 'block' : 'none';
        var a = (4* (Qt/1000) ) / (Math.PI*VE);
        var Dmba = Math.sqrt(a);
        var hfmba = 10.643 * Math.pow(( (3* (Qt/1000) ) / Cp ), 1.852) * ( Cmba / (Math.pow(Dmba,4.87)) * Fp1);
        var HMT = (hfmba + Pins + hr + hs)*1.1;
        var Pot = (Qt*HMT)/(75*(RM/100));
    }
    document.getElementById('Dmba').innerHTML = Dmba;
    document.getElementById('Cmba').innerHTML = Cmba;
    document.getElementById('HMT').innerHTML = HMT;
    document.getElementById('Pot').innerHTML = Pot;
    }

function DimensionarBiodigestor(el){

var div = document.getElementById(el);
var disp = div.style.display;
div.style.display = disp == 'none' ? 'block' : 'none';

var Na = parseFloat(document.getElementById('Na').value);

if (document.getElementById("Bovino").checked)
{
    var estercodia = 25; //Em kg
    var agua = 1; //Em litros
    var densidade = 960; //kg/m3
    var tempo = 30; //dias
    var conversao = 0.04; //kg/m3
}
else if(document.getElementById("Suino").checked)
{
    var estercodia = 5.8; //Em kg
    var agua = 2; //Em litros
    var tempo = 35; //dias
    var densidade = 1010; //kg/m3
    var conversao = 0.35; //kg/m3
}

var massaesterco = Na * estercodia //total de kg de esterco por dia
var litrosagua = agua * massaesterco; //litros de água por dia
document.getElementById('La').innerHTML = litrosagua;
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

document.getElementById('H').innerHTML = H;
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
document.getElementById('Bi').innerHTML = Bi;
var Bs = 0.7279 * H + Bi;
document.getElementById('Bs').innerHTML = Bs;
var L = 3.6395 * H + 5*Bi;
document.getElementById('L').innerHTML = L;

var Ep = massaesterco * conversao;
document.getElementById('Ep').innerHTML = Ep;

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
document.getElementById('Alona').innerHTML = Alona;

var Ce = Math.sqrt((volumediario*1.2),2);
document.getElementById('Ce').innerHTML = Ce;

var Cs = Math.sqrt((volumediario*1.2*3),2);
document.getElementById('Cs').innerHTML = Cs;

}

function Aparecer(){

    var div = document.getElementById("inputoffgrid");
    var disp = div.style.display;
    div.style.display = disp == 'none' ? 'block' : 'none';

}

function DimensionarEolica(el){

    var div = document.getElementById(el);
    var disp = div.style.display;
    div.style.display = disp == 'none' ? 'block' : 'none';

    var Cmm = parseFloat(document.getElementById('Cmm').value);
    var Vv = parseFloat(document.getElementById('Vv').value);
    var Dp = parseFloat(document.getElementById('Dp').value);

    var Pd = (Cmm*1000)/30;
    var Area = Math.PI * Math.pow( (Dp/2), 2); 
    var Pae = ( 1.2754 * Area * Math.pow(Vv,3) ) / 2;
    var Paedia = n * 24;
    var Nae = Pd / Paedia;
    document.getElementById('Nae').innerHTML = Math.round(Nae);
    document.getElementById('PI').innerHTML = Pae * 1,3 * Math.round(Nae);

    if (document.getElementById("offgrid").checked)
    {
        var div = document.getElementById("resultoffgrid");
        var disp = div.style.display;
        div.style.display = disp == 'none' ? 'block' : 'none';

        var TM = parseFloat(document.getElementById('TM').value);
        var Tbb = parseFloat(document.getElementById('Tbb').value);
        var Autonomia = parseFloat(document.getElementById('Autonomia').value);
        var Cb = ( Pd * Autonomia) / ( Tbb * 0.6);
        document.getElementById('Cb').innerHTML = Cb;
        var Cc = (Pd * 1.1) / Tbb ;
        document.getElementById('Cc').innerHTML = Cc;
    }

}

function AparecerSolar(){

    var div = document.getElementById("inputoffgrid");
    var disp = div.style.display;
    div.style.display = disp == 'none' ? 'block' : 'none';
}

function DimensionarSoalr(el){

    var div = document.getElementById(el);
    var disp = div.style.display;
    div.style.display = disp == 'none' ? 'block' : 'none';

    var Pp = parseFloat(document.getElementById('Pp').value);
    var Ctd = parseFloat(document.getElementById('Ctm').value) / 30;
    var Hspd = parseFloat(document.getElementById('Hspd').value);
    if (document.getElementById("ongrid").checked)
    {
        var Pg = Ctd / (Hspd * 0.7);
        document.getElementById('PI').innerHTML = Pg;
        var TRD = Pg / Pp;
        document.getElementById('TRD').innerHTML = Math.round(TRD);
    }

    else if (document.getElementById("offgrid").checked)
    {
        var div = document.getElementById("resultoffgrid");
        var disp = div.style.display;
        div.style.display = disp == 'none' ? 'block' : 'none';
        var TM = parseFloat(document.getElementById('TM').value);
        var Tbb = parseFloat(document.getElementById('Tbb').value);
        var Autonomia = parseFloat(document.getElementById('Autonomia').value);
        var Cb = ( Ctd * Autonomia) / ( Tbb * 0.6);
        document.getElementById('Cb').innerHTML = Cb;
        var Fpp = Tbb / TM;
        var Pg = Ctd / (Hspd * 0.8 * Fpp);
        var TRD = Pg / Pp;
        document.getElementById('TRD').innerHTML = Math.round(TRD);
        document.getElementById('PI').innerHTML = Pg;
        var Cc = (Pg * 1.1) / Tbb ;
        document.getElementById('Cc').innerHTML = Cc;
    }

}

function DimensionarGotejamento(el){

    var div = document.getElementById(el);
    var disp = div.style.display;
    div.style.display = disp == 'none' ? 'block' : 'none';

    //Manejo
    var occ = parseFloat(document.getElementById('CC').value);
    var opmp = parseFloat(document.getElementById('PMP').value);
    var Z = parseFloat(document.getElementById('Z').value);
    var f = parseFloat(document.getElementById('f').value);
    var ADR = (occ-opmp)*Z*(f/100)*10;
    var Kc = parseFloat(document.getElementById('KC').value);
    var Eto = parseFloat(document.getElementById('ETO').value);
    var ETpc = Kc*Eto;
    var TR = ADR / ETpc;
    var Ea = parseFloat(document.getElementById('IR').value)/100;
    var ITN = ADR / Ea;
    var ID = ITN / TR;
    document.getElementById('ITN').innerHTML = ID;
    var q = parseFloat(document.getElementById('VZ').value); //Vazão de um emissor
    var EE = parseFloat(document.getElementById('EE').value); //Espaçamento entre emissores
    var Eel = parseFloat(document.getElementById('Eel').value); //Espaçamento entre linhas
    var TRD = ( ID * EE * Eel) / (q*1000);
    document.getElementById('TRD').innerHTML = TRD;

    //Dimensionamento de Setores
    var CA = parseFloat(document.getElementById('CA').value); //Comprimento do local
    var LA = parseFloat(document.getElementById('LA').value); //Largura do local
    var Area = CA * LA; //Cálculo da área
    var Ns = parseFloat(document.getElementById('Ns').value); //Número de setores
    var Areasetores = Area / Ns; // Cálculo da área de cada setor
    var Comprimentosetor = CA / (Ns/2); //Comprimento de cada setor
    var Largurasetor = LA / 2; //Largura de cada setor

    //Dimensionamento das linhas laterais                
    var Tmg = ( ( Largurasetor / Eel) * Comprimentosetor ) * Ns; //Tamanho mangueiras de gotejamento
    document.getElementById('Tmg').innerHTML = Tmg;
    var PS = parseFloat(document.getElementById('PS').value); //Pressão de serviço
    var DZl = parseFloat(document.getElementById('Decl').value); //Declividade da linha lateral

    if (document.getElementById("Nivell").checked)
    {
        var hfl = 0.3*PS;
        var Pinl = PS + ((3*hfl)/4);
    }
    else if (document.getElementById("Aclivel").checked)
    {
        var hfl = 0.3*PS - DZl;
        if (Math.sign(hfl) == -1 || Math.sign(hfl) == 0)
        {
            hfl = DZl;
        }   
        var Pinl = PS + ((3*hfl)/4)+ 0.5*DZl;
    }
    else if (document.getElementById("Declivel").checked)
    {
        var hfl = 0.3*PS + DZl;
        var Pinl = PS + ((3*hfl)/4) - 0.5*DZl;
    }

    if (document.getElementById("Simm").checked)
    {
        var Dm = parseFloat(document.getElementById('Dm').value); //Diâmetro interno da mangueira
        var Nspm = (Comprimentosetor / EE); //Número de saídas
        var Fl = (1/(2.852))+(1/(2*parseInt(Nspm)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(Nspm),2))); //Calculo do F da linha lateral
        var Qll = q * Math.round(Nspm); //Vazão de uma linha lateral
        var Cl = parseFloat(document.getElementById('Cl').value);  //C da linha lateral
        var hflme = 10.643 * Math.pow( (Qll / Cl), 1.85) * ( Comprimentosetor / Math.pow( Dm, 4.87) ); //Perda de carga da mangueira
        var Numlinhalateral = Largurasetor / Eel;
        var Qp = Numlinhalateral * q * Nspm;
    }
    if (document.getElementById("Naom").checked)
    {
        var div = document.getElementById('gotnaoembutido');
        var disp = div.style.display;
        div.style.display = disp == 'none' ? 'block' : 'none';
        var Nte = ( (Comprimentosetor / EE) * ( Largurasetor / Eel) ) * Ns; //Número total de emissores
        document.getElementById('Nte').innerHTML = Math.round(Nte);
        var Nspm = (Comprimentosetor / EE); //Número de saídas
        var Fl = (1/(2.852)) + (1/(2*parseInt(Nspm))) + (Math.sqrt(0.852)/(6*Math.pow(parseInt(Nspm),2))); //Calculo do F da linha lateral
        var Qll = q * Math.round(Nspm); //Vazão de uma linha lateral
        var Cl = parseFloat(document.getElementById('Cl').value);  //C da linha lateral
        var r = (Qll/3600) / Cl;
        var r1 = 10.643 * Math.pow(r,1.852) * (Comprimentosetor / hfl) * Fl;
        var Dl =  Math.pow(r1, 0.205);
        document.getElementById('Dl').innerHTML = Dl;
        var Numlinhalateral = Largurasetor / Eel;
        var Qp = Numlinhalateral * q * Nspm;
    }

    //Dimensionamento da linha de derivação
    var Cd = Largurasetor; //Comprimento de uma linha de derivação
    var Ctd = Cd * Ns; //Comprimento total das linhas de derivação
    document.getElementById('Cmpd').innerHTML = Cd;
    document.getElementById('Ctd').innerHTML = Ctd;
    var Nsd = Largurasetor / Eel ; //Número de saídas de uma linha de derivação
    var Qd =  Nsd * Qll;
    document.getElementById('Qd').innerHTML = Qd;
    var VE = parseFloat(document.getElementById('VE').value);
    var Dd = Math.sqrt(((4*(Qd/3600))/(Math.PI*VE)));
    document.getElementById('Dd').innerHTML = Dd;
    var Cld = parseFloat(document.getElementById('Cd').value);
    var Fd = (1/(2.852))+(1/(2*parseInt(Nsd)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(Nsd),2))); //Calculo do F da linha de derivação
    var hd = 10.643 * Math.pow(((3*(Qd/3600))/Cld),1.852)*(Cd/Math.pow(Dd,4.87))*Fd; //Perda de carga da linha de derivação
    
    //Dimensionamento da linha principal
    var Lp = CA - Comprimentosetor; //Largura da linha principal
    document.getElementById('Lp').innerHTML = Lp;
    var Dp = Math.sqrt(((4*(Qp/3600))/(Math.PI*VE)));
    document.getElementById('Dp').innerHTML = Dp;
    var Cp = parseFloat(document.getElementById('Cp').value);
    var CLS = parseFloat(document.getElementById('CLS').value);
    var Fp = (1/(2.852))+(1/(2*Ns))+(Math.sqrt(0.852)/(6*Math.pow(Ns,2)));
    var hp = 10.643 * Math.pow(((3*(Qp/3600))/Cp),1.852)*((Lp+CLS)/Math.pow(Dp,4.87))*Fp;

    //Dimensionamento da motobomba
    var hs = parseFloat(document.getElementById('AS').value);
    var hr = parseFloat(document.getElementById('AR').value);
    if (hflme == true)
    {
        var HMT = (hd + hp + hflme + Pinl + hr + hs)*1.1; //Altura manométrica total
    }
    else
    {
        var HMT = (hd + hp + hfl + Pinl + hr + hs)*1.1; //Altura manométrica total
    }
    document.getElementById('Qp').innerHTML = Qp;
    document.getElementById('HMT').innerHTML = HMT;
    var RM = parseFloat(document.getElementById('RM').value);
    var Pot = ( ( Qp / 3.6 ) * HMT ) / ( 75 * ( RM / 100 ) ); //Potência da motobomba
    document.getElementById('Pot').innerHTML = Pot;

    //Dimensionamento do sistema de filtragem
    var SAF = (Qp * 1.1 ) / 60;
    document.getElementById('SAF').innerHTML = SAF;
    var DF = Math.sqrt((4-SAF)/Math.PI);
    document.getElementById('DF').innerHTML = DF;
}

function DimensionarMicroAsp(el){

    var div = document.getElementById(el);
    var disp = div.style.display;
    div.style.display = disp == 'none' ? 'block' : 'none';

    //Cálculo da evapotranspiração
    var ECA = parseFloat(document.getElementById('ECA').value);
    var Kp = parseFloat(document.getElementById('Kp').value);
    var ETo = ECA * Kp; //Evapotranspiração de referência
    var Kc = parseFloat(document.getElementById('Kc').value);
    var Etm = Kc * ETo; //Evapotranspiração máxima
    var Etg = parseFloat(document.getElementById('Kr').value); //Evapotranspiração reduzida para irrigação localizada

    //Cálculo do diâmetro molhado
    var n = parseFloat(document.getElementById('n').value);
    var D = parseFloat(document.getElementById('DM').value);
    var AM = ( Math.PI * Math.pow(D,2) ) / 4 //Área molhada
    var Ep = parseFloat(document.getElementById('Ep').value);
    var El = parseFloat(document.getElementById('El').value);
    var Ate = Ep * El; //Área explorada
    var Pam =  (n*AM) / Ate; //Porcentagem de área molhada

    //Lâmina máxima de Irrigação
    var CC = parseFloat(document.getElementById('CC').value);
    var PMP = parseFloat(document.getElementById('PMP').value);
    var ds = parseFloat(document.getElementById('ds').value);
    var Z = parseFloat(document.getElementById('PSR').value);
    var f = parseFloat(document.getElementById('f').value);
    var hmax = (CC - PMP) * ds * Z * (f/100) * Pam; //Lâmina máxima de irrigação
    document.getElementById('hmax').innerHTML = hmax;

    //Lâmina real de irrigação
    var Fmax = hmax / Etg; //Período máximo de irrigação
    document.getElementById('Fmax').innerHTML = Math.round(Fmax);

    //Tempo de Irrigação
    var q = parseFloat(document.getElementById('VZ').value);
    var Ee = parseFloat(document.getElementById('Ee').value);
    var T = ( hmax * Ee * El) / ( n * q * 1000);
    document.getElementById('T').innerHTML = Math.round(T);

    //Dimensionamento da linha lateral
    var L = parseFloat(document.getElementById('LA').value);
    var Ll = L / 8; //Tamanho de cada linha lateral
    var C = parseFloat(document.getElementById('CA').value);
    var Cl = C;
    document.getElementById('Ll').innerHTML = Ll;
    var Ntll = (( Cl - (El/2) ) / El) * 2 * 4; //Número total de linhas laterais
    document.getElementById('Nll').innerHTML = Math.round(Ntll);
    var Ctll = Ntll * Ll; //Comprimento total das linhas laterais
    document.getElementById('Ctll').innerHTML = Math.round(Ctll);
    var Nall = ( Ll - (Ep/2) ) / Ep; //Número de aspersores da linha lateral
    document.getElementById('Nall').innerHTML = Math.round(Nall);
    var Ntma = Math.round(Ntll) * Math.round(Nall); //Número total de aspersores
    document.getElementById('Ntma').innerHTML = Ntma;
    var PS = parseFloat(document.getElementById('PS').value);
    var DZl = parseFloat(document.getElementById('Decl').value);
    if (document.getElementById("Nivell").checked)
    {
        var hfl = 0.6*PS;
        var Pins = PS + ((3*hfs)/4);
        var Pfs = PS - 0.25*hfs;
    }
    else if (document.getElementById("Aclivel").checked)
    {
        var hfl = 0.6*PS - DZl;
        if (Math.sign(hfl) == -1 || Math.sign(hfl) == 0)
        {
            hfl = DZ;
        }
        var Pins = PS + ((3*hfl)/4)+ 0.5*DZl;
        var Pfs = PS - 0.25*hfl + 0.5*DZl;
    }
    else if (document.getElementById("Declivel").checked)
    {
        var hfl = 0.6*PS + DZl;
        var Pins = PS + ((3*hfl)/4) - 0.5*DZl;
        var Pfs = PS - 0.25*hfl- 0.5*DZl;
    }
    var Fl = (1/(2.852))+(1/(2*parseInt(Nall)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(Nall),2))); //Calculo do F da linha lateral
    var Qll = q * Math.round(Nall); //Calculo da vazão total de uma linha lateral
    document.getElementById('Qll').innerHTML = Qll;
    var Cll = parseFloat(document.getElementById('Cl').value);
    var r = (Qll/3600) / Cll;
    var r1 = 10.643 * Math.pow(r,1.852) * ( Cll / hfl) *Fl;
    var Dl =  Math.pow(r1, 0.205);
    document.getElementById('Dl').innerHTML = Dl;

    //Dimensionamento da linha de derivação
    var Cd = C - (El/2); //Comprimento de uma linha de derivação
    var Ctd = Cd * 4 //Comprimento total das linhas de derivação
    document.getElementById('Cmpd').innerHTML = Cd;
    document.getElementById('Ctd').innerHTML = Ctd;
    var Nsd = ( ( ( Cl - (El/2) ) / El ) * 2 ); //Número de saídas de uma linha de derivação
    var Qd =  Nsd * Qll;
    document.getElementById('Qd').innerHTML = Qd;
    var VE = parseFloat(document.getElementById('VE').value);
    var Dd = Math.sqrt(((4*(Qd/3600))/(Math.PI*VE)));
    document.getElementById('Dd').innerHTML = Dd;
    var Cld = parseFloat(document.getElementById('Cd').value);
    var Fd = (1/(2.852))+(1/(2*parseInt(Nsd)))+(Math.sqrt(0.852)/(6*Math.pow(parseInt(Nsd),2))); //Calculo do F da linha de derivação
    var hd = 10.643 * Math.pow(((3*(Qd/3600))/Cld),1.852)*(Cd/Math.pow(Dd,4.87))*Fd; //Perda de carga da linha de derivação

    //Dimensionamento da linha principal
    var Lp = L - ( 2 * Ll); //Largura da linha principal
    document.getElementById('Lp').innerHTML = Lp;
    var Qp = Ntma * q;
    var Dp = Math.sqrt(((4*(Qp/3600))/(Math.PI*VE)));
    document.getElementById('Dp').innerHTML = Dp;
    var Cp = parseFloat(document.getElementById('Cp').value);
    var CLS = parseFloat(document.getElementById('CLS').value);
    var Fp = (1/(2.852))+(1/(2*4))+(Math.sqrt(0.852)/(6*Math.pow(4,2)));
    var hp = 10.643 * Math.pow(((3*(Qp/3600))/Cp),1.852)*((Lp+CLS)/Math.pow(Dp,4.87))*Fp;

    //Dimensionamento da motobomba
    var hs = parseFloat(document.getElementById('AS').value);
    var hr = parseFloat(document.getElementById('AR').value);
    var HMT = (hd + hp + hfl + Pins + hr + hs)*1.1; //Altura manométrica total
    document.getElementById('Qp').innerHTML = Qp;
    document.getElementById('HMT').innerHTML = HMT;
    var RM = parseFloat(document.getElementById('RM').value);
    var Pot = ( ( Qp / 3.6 ) * HMT ) / ( 75 * ( RM / 100 ) ); //Potência da motobomba
    document.getElementById('Pot').innerHTML = Pot;
}

function DimensionarNebulizador(el){

    var div = document.getElementById(el);
    var disp = div.style.display;
    div.style.display = disp == 'none' ? 'block' : 'none';

    var Cv = parseFloat(document.getElementById("Cv").value);
    var Nv = parseFloat(document.getElementById("Nv").value);
    var Ee = parseFloat(document.getElementById("Ee").value);
    var Cn = parseFloat(document.getElementById("Cn").value);
    var Tbs = parseFloat(document.getElementById("Tbs").value);
    var Ur = parseFloat(document.getElementById("Ur").value);
    var Tpo = parseFloat(document.getElementById("Tpo").value);
    var H = parseFloat(document.getElementById("H").value);

    var dbs = 1.2791 * Math.pow(Math.E, (-0.003*Tbs));
    var Pbs = (-1.0979 * H + 10091) / 10;
    console.log(dbs);
    console.log(Pbs);
    var dbm = 1.2791 * Math.pow(Math.E, (-0.003*Tpo));
    var Pbm = (-1.0979 * H + 10091)/10;
    console.log(dbm);
    console.log(Pbm);
    
    var Pvsbs = 0.6108*Math.pow(10, ((7.5*Tbs)/(237.3+Tbs)));
    console.log(Pvsbs);
    var Pvbs = (Ur*Pvsbs) / 100;
    console.log(Pvbs);
    var wbs = (0.622 * Pvbs) / (Pbs-Pvbs);
    console.log(wbs);

    var Pvsbm = 0.6108*Math.pow(10, ((7.5*Tpo)/(237.3+Tpo)));
    console.log(Pvsbm);
    var Pvbm = (100*Pvsbm) / 100;
    console.log(Pvbm);
    var wbm = (0.622 * Pvbm) / (Pbm - Pvbm);
    console.log(wbm);

    var dw = (wbm - wbs)*10;
    console.log(dw);

    var N = (Ee * (Nv*Cv) *  dbs * dw * 0.01) / (Cn/60);
    document.getElementById('N').innerHTML = Math.round(N);
}

function DimensionarVentilacao(el){
    
    var div = document.getElementById(el);
    var disp = div.style.display;
    div.style.display = disp == 'none' ? 'block' : 'none';

    var C = parseFloat(document.getElementById("C").value);
    var L = parseFloat(document.getElementById("L").value);
    var H = parseFloat(document.getElementById("H").value);
    var Cv = parseFloat(document.getElementById("Cv").value);
    var Var = parseFloat(document.getElementById("Var").value);

    var N = ( L * H * Var * 60) / (Cv*0.9);
    document.getElementById('N').innerHTML = Math.round(N);

    var An = L * H;
    document.getElementById('An').innerHTML = An;
}