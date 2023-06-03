# Guyri: A desktop app to size several agricultural engineering projects

<p>Author: Eng. Gustavo Santiago</p>
<p>Contact: gustavosantiago@usp.alumni.br</p>

<center><img style='width:150px' src="Icons/QRcode.png"></center>


<hr>

## 1. INTRODUCTION
<p>In order to avoid wasting money and resources while developing any project it is vital to design and size everything based on methods previously described for that. In agricultural field, that wouldn't be different. If a pivot is sized in a wrong way, it may lead to a colossal loss of water and consequently, energy. Pulling to energy side, if the number of solar panels is less than what is needed, you may face a lack of energy production. In the same level, if your composting or bio digesting process don't have enough materials, it won't work properly. With the purpose of avoiding all these problems, a good agricultural or biosystems engineer must know how to size and with the assistance of tools, the work gets more simple.</p>
<p>Usually an engineer uses the purest way to build something: a piece of paper, pencil and the knowledge. Later, people started to use excel sheets to entry values and obtain the outputs. But nowadays, with the advent and spread of digital technology, many softwares emerged and are being used to help in that task. However, an agricultural or a biosystems engineer has knowledge to size not only one kind of project aimed to rural interests but many ones, borning the need of a software that aggregates all those knowledge areas into one place. That tool also must be accessed with and without internet due to lack of network signal at many rural places around the world, with the option to generate reports in order to save input and output results on no-internet situations.</p>
<p>The perfect match for those needs is a desktop app (DA) which is a software program developed to run on computers and execute a specific task. This task can be entertainment, work tool or gaming; as examples, there are YouTube, Netflix, Github and many others. All this big companies developing DAs show that this is a option with many advantages for developers and for users as well. One of this advantage is that it is made to run on isolated environment, making it more secure than running on a browser as a web page; also, DAs work without the need of internet connection, differently than common web applications.</p>
<p>Perceiving all these issues, the objective of this work was to develop a DA to aid agricultural and biosystems engineer during their sizing work. The DA must have a clean and straight forward user interface (UI), work without internet connection and has the possibility to generate reports.</p>

<hr>

## 2. LITERATURE REVIEW

### 2.1 Economical Analysis

<p>The economical analysis is calculated using the formulas of (1) simple payback, (2) discounted payback, return on investment (3) and annual profitability (4). All formulas were obtained on internet from different websites.</p>
<li>Simple Payback = Initial Investment / Amount Saved per Month (1)</li>
<li>Discounted Payback = Amount Saved per Month / (1 + Minimum attractive rate) (2) </li>
<li>Return on Investment = (Gain Obtained - Initial Investment) / Initial Investment (3) </li>
<li>Annual Profitability = ( Annual Net Income / Total Invested Amount) * 100 (4) </li>
<br>

### 2.2 Irrigation
<br>

#### 2.2.1 Dripping

<p>The dripping sizing was based on the example project as on the book "SISTEMAS DE IRRIGAÇÃO LOCALIZADA" from Biscaro et al. (2014), chapter 11, among all mathematical formulas used on Guyri. On it, the site is rectangular and aspects of the crop, soil, topography, water and climate were taken. Based on those characteristics, management's variables are calculated. The sectors were pre-defined in the example, but at Guyri, users' choose the number of sectors and the algorithm divides the site. Dividing the site, it takes the measures, length and flow of lateral lines.</p>
<p>The drippers were chosen based on a commercial model. Using Guyri, users' can insert drip hoses diameter from commercial models or select to algorithm to determine the best diameter. Derivation and Main lines diameters, pressure lost and flow are calculated according to book's example. On Guyri, all diameters are re-selected based on the closest commercial diameter and pressure lost re-calculated.</p>
<p>Motor pump and filtering system were calculated according to the book and the outputs are flow, total manometer height, power (for motor pump) and minimum filtering surface area and minimum filter diameter (for filtering system). With those information, the engineers are able to buy the correct motor pump and filtering system (if needed).</p>
<p>The difference between Guyri and the literature is that on the algorithm, sector are fixed. The consequence of that is sketch format and height can not be changed, limiting the usage for small and simple projects.</p>

<br>

#### 2.2.2 Sprinkling

<p>Sprinkling size was based on section Aspersao Convencional, wrote by Geraldo Magela Pereira on the book Irrigacao (2001). On it, differently of dripping size, he displays only the formulas and the step by step to obtain the inputs and calculate the outputs of the whole process. Guyri gives to users' management, secondary line, main line, motor pump information. Users' have the possibility to select if the sprinklers positions will be changed and the software will calculate different motor pump flow according to the information in order to save money buying a stronger motor pump.</p>
<p>Just like on dripping, the sketch format can't be changed and different heights in the site can't be inputted. But, differently of the dripping size, this part of software can be used in bigger projects. And, in the same way, the diameters are the commercial ones closest to calculated's, and the pressure lost, re-calculated using the commercial diameters of pipes. </p>

<br>

#### 2.2.3 Micro-Sprinkling
<p>The reference used in this section was taken from class annotations and slides presentation of the author while attending Irrigation's class at the university. The course was ministered by Profa. Dra. Tamara Maria Gomes at Universidade de Sao Paulo - FZEA. In the occasion, she gave a practical example of how to size a micro-sprinkling, providing all formulas and steps. It is not available due to copyrights.</p>
<p> On micro-sprinkling section in Guyri, the sketch used is showed below, where the main line is on horizontal top, the derivation lines are on vertical and the secondary lines are on horizontal. Besides, micro-sprinkling on the software was made mainly to be used on tree crops.</p>
<img src="Icons/Sketch Micro-sprinkling.png">
<p>Just like on examples above, the diameters are the commercial ones closest to calculated's, and the pressure lost, re-calculated using the commercial diameters of pipes.</p>

<br>

#### 2.2.4 Central Pivot

<p>For central pivot, references from de Silva & Azevedo (1998), Almeida (2019) and Junior (2022) were taken. There is a possibility to add a sprinkling canon in the end of the central pivot. On Guyri, every pivot is divided on four sections, with everyone having the same flow. Again, he diameters are the commercial ones closest to calculated's, and the pressure lost, re-calculated using the commercial diameters of pipes.</p>

<br>

### 2.3 Energy
<br>

#### 2.3.1 Solar Heating
<p>All equations from Solar Heating were taken from internet on different websites. On Guyri, the total consumption volume is calculated by the sum of multiplication of the flow, using time and frequency of use of each equipment. The storage volume is calculated is obtained by the formula (5). Useful energy is obtained according to equation 6. Number of collectors is calculated using energies values from commercial collectors inputted from users and from equation 6 and considering losses.</p>
<li>Storage Volume = (Consumption Volume * (Consumption Temperature - Ambient Temperature)) / (Storage Temperature - Ambient Temperature) (5)</li>
<li>Useful Energy = (Storage Volume * Water Especific Mass * Specific Heat * (Storage Temperature - Ambient Temperature)) / 3600 (6)</li>

<br>

#### 2.3.2 Photovoltaic
<p>Both panels and batteries sizing methods were taken and adapted from Freitas (2008) where, on section 3, she presented an example of sizing, giving all formulas. Using Guyri, users can select if they want to size isolated or connected to power line photovoltaic systems.</p>
<p>Users insert information about annual sun hours, panel power, electric tension of batteries, consumption and efficiency on the platform and it calculates number of panels, inverter power and battery capacity. Hours of sun are inserted by users, meaning that it can be chosen from the lowest, highest or average number of hours along the year.</p>

<br>

#### 2.3.3 Wind
<p>Wind energy sizing were based on Sales, Belem and Alexandre's paper (2018), where they present sizing method for popular houses. Just like photovoltaic system, wind has option to add batteries, allowing to be off-grid. References for battery system sizing were taken from Freitas (2008). Calculations to generate power were based on wind power itself, not using a generator. Engineers using the program must pay attention on that detail.</p>

<br>

#### 2.3.4 Hydroelectric
<p>The references for this section were taken from Bergamo (2018). In her work, she compiled formulas and methods of sizing to following turbines: Pelton, Francis, Kaplan and Michell-Blanki.</p>
<p>On Guyri, first, users fill a form with basic information of the site and of the turbine. Using those information, the algorithm selects the turbine types that would fit on form filled, and then, users choose the one they prefer.</p>

<br>

### 2.4 Biological Systems

<br>

#### 2.4.1 Bio digester
<p>The bio digester that can be sized using Guyri is of tubular style, just like picture below. All formulas and instructions were used from Goncalves et al. (2018), with the difference that, on Guyri algorithm, it is possible to select swine and cattle, instead of just cattle like in the literature reference</p>
<img src="Icons\Biodigester.png"></img>

<br>

#### 2.4.2 Composter
<p>The formulas and methodology to be used on composter section were based on Embrapa's sheet, under responsibility of Leal (2018). On the sheet, are available instructions, formulas and calculation methods to obtain ideal ratio of C:N for composting process.</p>

<br>

### 2.5 Protecteds
<br>

#### 2.5.1 Forced Ventilation
<p>Forced ventilation section formulas' and process' were obtained and based on Abreu & Abreu (2000) book. On it, they demonstrate how to size ventilation systems for poultry farming. The objective is to use air pushed from fans to remove the heat from inside a building.</p>
<br>

#### 2.5.2 Air Conditioner
<p>Air Conditioner sizing method was taken from internet from various websites. To calculate the number of BTUs required, Guyri uses reference fixed values for windows' display, number of people and equipment and site area.</p>
<br>

#### 2.5.3 Fogging
<p>Fogging refrigeration system sizing were obtained from annotations of Prof. Dr. Iran Jose Oliveira da Silva class in 2013. He is a professor at University of Sao Paulo - ESALQ. On the occasion, he gave an example of sizing to calculate the number of fogging nozzles for poultry farming. To use some variables in the formulas, it was necessary to have values obtained from curves. Using as reference Dantas (2012), curves equations were generated and, in that way, values could be obtained.</p>

<br>
<hr>

## 3. MATERIALS E METHODS
<br>

### 3.1 Programming Languages
<p>Guyri was developed using JavaScript, CSS and HTML. JavaScript was used to make make the calculations and to appear more form sections and remove those ones on Solar Heating and Composting. Besides that, was also used to change display block to none on some divisions on HTML, and Electron configurations as well. Almost all styling was made using CSS, including the appearance of lateral and main menu. Colors, centralization and appearance changes are also due to CSS. The "skeleton" of the DA was made using HTML, separating into divisions and allowing CSS to stylize Guyri.</p>
<br>

### 3.2 Frameworks
<p>Bootstrap, a CSS and JavaScript based framework from Twitter, was responsible for the modals that appears when the user clicks on "Size!" button.</p>
<p>The Electron framework is the responsible to make a HTML-CSS-JavaScript project into a DA. To use it, is necessary to create a npm project into a folder using the command on a terminal:
<code>npm init</code> and, after the project is created, enter the following command on terminal:</p>
<code>npm i electron (name of your project)</code>
<p>After creating the node_modules folder, it is necessary to go to scripts in package.json and write:</p>
<code>"start": "electron ."</code>
<p>After that, is necessary to work on the main JavaScript file to configure the app. To make it start working and test it, is necessary to go on terminal and type:</p>
<code>npm start</code>
<p>After finish the app, in order to publish it, is needed to follow the instructions on this <a href = "https://www.christianengvall.se/electron-packager-tutorial/">website</a>.</p>
<p>In Guyri, it was followed, generating in the need of running the following commands on terminal line:</p>
<code>npm install electron-packager --save-dev</code>
<p>And this one:</p>
<code>npm install --save-dev electron</code>
<p>After that, was needed to go to the package.json file and add, inside scripts, the following line (for windows): </p>
<code>"package-win": "electron-packager . Guyri --overwrite --asar=true --platform=win32 --arch=x64 --icon=Icons/Logotipo-2.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Guyri\""</code>
<p>Where: "--arch=x64" means the architecture of the system. To deploy the app, was wrote, on terminal, the command:</p>
<code>npm run package-win</code>

<br>

### 3.3 Libraries
<p>Two libraries were used on Guyri: html2pdf and chart.js. The first one is responsible to convert the results modal made using Bootstrap into a pdf file, letting users have the inputs and outputs of their sizing on a savable pdf file. The second one generates the chart that compares the "Simple vs Discounted payback" on Economical Analysis section.</p>
<br>

### 3.4 Algorithm Organization
In the main folder, there is the functions, index and style algorithms, being these the main ones. In the folder called Sizing Pages is each sizing html algorithm. The icons used were downloaded from the internet and are in the folder Icons. Lastly, the SizingTutorials folder has the pdf of some of the tutorials mentioned in the Literature Review.
<br>
<hr>

## 4. CASE STUDY

<p> Mrs. Maria Carolina has just graduated on Biosystems Engineering and, to start her life in the ag field, bought a farm. In her farm, she will raise dairy and beef cattle and plant soy and corn. She was an smart student who used to pay attention on all classes. Because of that, she knows how to size somethings she will need, but not all, might needing some help.</p>
<p>Her far is located at Goias state, Brazil. The place is new and doesn't have internet connections and since is far away from cellphone companies, doesn't have telephone signal. She can't access the internet to help her, therefore, she is an ARA client and in consequence, has the right to use Guyri to help her on sizing issues.</p>
<p>Following are the particularities of the farm:</p>
<ul>* 100 dairy cattle confined in a shed</ul>
<ul>* Square arable site of 330m each side with height difference of 5 meters</ul>
<ul>* Average of 5.5 hours of sun daily, but not much wind</ul>
<ul>* Silty Soil</ul>
<ul>* Connection with the electrical net</ul>
<ul>* Easy access to water, but without waterfalls</ul>
<p> With those information, she decided to: irrigate the arable land under a pivot and, in the same area, plant the soy, corn and raise the beef cattle; due to warmth of the place, she will install a forced ventilation system for her dairy and, to not waste the manure, will install a biodigestor to take the fertilizer and gas from it; she is not sure if worth to install a solar energy system, so she will check the economical viability of it. Since the place is far away from the city, and doesn't have internet she will use the Guyri DA to size everything and take the PDF reports to the city afterwards </p>

<p>Maria Carolina used Guyri inside her property and could get the inputs and outputs from all sizing projects she made. With that, she could know:</p>
<ul>-> Everything she need to build the hydraulic and motor pump of central pivot;</ul>
<ul>-> The number of fans and open area to insert inside the shed for dairy cattle;</ul>
<ul>-> Amount of water to add daily and dimensions of biodigestor to be build;</ul>
<ul>-> That, by the current price of energy in her region and price of panels, solar energy will worth the investment and;</ul>
<ul>-> Number of panels and invertor power she will need to buy.</ul>

<hr>

## 5. FUTURE STEPS
<p>In the future, there will be the need of connecting all the sizes inputs and outputs to a database (DB). This way, the client can synchronize with the cloud when internet is available and transfer everything to the DB, generating historical. To make connection to cloud and client DB possible, is essential to have a backend algorithm working on a server assuring client-DB-Guyri relationships.</p>
<p>Some sections must be more complete and/or have more details. Economical Analysis must be incremented and more complete, making more different analysis possible. Since on Irrigation section is only possible to size on rectangular or square sites, it is important to think on a way to break down this limitation. As an idea, users could draw on a map the main, derivation and secondary lines as well as the dripping or micro-sprinkling sectors. Another thing would be to add more than one source of straw on Composter, but, to do that, a complex mathematical accounts template must be added. Maybe the user wants another biodigestion system, opening the need for more biodigestor models' to be added on Guyri.</p>

<hr>

## REFERENCES

<p>Biscaro, Guilherme A. et al. SISTEMAS DE IRRIGAÇÃO LOCALIZADA. Ed. UFGD - Dourados, MS (2014). ISBN: 978-85-8147-085-6, 256p.</p>
<p>PEREIRA, G. M. . IRRIGAÇÃO POR ASPERSÃO CONVENCIONAL. Lavras-MG: UFLA, 2001 (APOSTÍLA).</p>
<p>SILVA, E.M. da; AZEVEDO, J.A. de. Dimensionamento da lateral de irrigação do pivô-central. Planaltina: Embrapa-CPAC, 1998. 54p.</p>
<p>Almeida, Isabela Alvarenga. Dimensionamento econômico para sistemas de irrigação pivô central telescópico: estudos de cenários para diferentes regiões do Brasil. Dissertação (Mestrado) - - USP / Escola Superior de Agricultura “Luiz de Queiroz", Piracicaba, 2019. 92 p.</p>
<p>Junior, Joao B. Tolentino. Irrigacao Pressurizada. Online Book. Available at: <a href="https://irrigacao.tolentino.pro.br/">https://irrigacao.tolentino.pro.br/</a></p>
<p>Freitas, Susana S. A. Dimensionamento de sistemas fotovoltaicos. Relatorio de projecto para obtencao do grau de Mestre em Engenharia Industrial. Instituto Politecnico de Braganca, 2008, 105p.</p>
<p>Sales, Maria E. de O.; Belem, Gabriel da S. & Alexandre, Geronimo B. Dimensionamento um sistema eolico isolado para casas populares. CONTECC, Maceio-AL, Brasil, August 21 to 24 of 2018.</p>
<p>BERGAMO, Paula R. Specifications of hydraulic turbines. 2018. 72f.Course Completion work - Course in Electrical Engineering, Universidade Tecnológica Federal do Paraná. Pato Branco, 2018.</p>
<p>Leal, Marco A. de A. Calculo de Compostagem. Embrapa, available at: <a href="https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fciorganicos.com.br%2Fwp-content%2Fuploads%2F2017%2F10%2FPlanilha-de-calculo-de-compostagem-Embrapa-Agrobiologia-22.SNA_.OrganicsNet.CI-Organicos-22.xlsx&wdOrigin=BROWSELINK">https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fciorganicos.com.br%2Fwp-content%2Fuploads%2F2017%2F10%2FPlanilha-de-calculo-de-compostagem-Embrapa-Agrobiologia-22.SNA_.OrganicsNet.CI-Organicos-22.xlsx&wdOrigin=BROWSELINK</a></p>
<p>ABREU, P.G. de; ABREU, V.M.N. Ventilação na avicultura de
corte. Concórdia: Embrapa Suínos e Aves, 2000. 50p.</p>
<p>Dantas, Luís Antônio. Soluções computacionais analítico-numéricas aplicadas à simulação de secagem de produtos biológicos. Tese (Doutorado em Engenharia de Processos) - Universidade Federal de Campina Grande, Centro de Ciências e Tecnologia, 2012, 124p.</p>