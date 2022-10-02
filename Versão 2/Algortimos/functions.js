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