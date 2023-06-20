# Guyri

>A desktop app to size several agricultural engineering projects

Author: Eng. Gustavo Santiago

Contact: gustavosantiago@usp.alumni.br

----

## List of contents

1. [Introduction](#introduction)
2. [Literature review](#literature-review)
    1. [Economical Analysis](#21-economical-analysis)
    2. [Irrigation](#22-irrigation)
        1. [Dripping](#221-dripping)
        2. [Sprinkling](#222-sprinkling)
        3. [Micro-Sprinkling](#223-micro-sprinkling)
        4. [Central Pivot](#224-central-pivot)
    3. [Energy](#23-energy)
        1. [Solar Heating](#231-solar-heating)
        2. [Photovoltaic](#232-photovoltaic)
        3. [Wind](#233-wind)
        4. [Hydroelectric](#234-hydroelectric)
    4. [Biological Systems](#24-biological-systems)
        1. [Biodigester](#241-bio-digester)
        2. [Composter](#242-composter)
    5. [Protected](#25-protected)
        1. [Forced Ventilation](#251-forced-ventilation)
        2. [Air conditioner](#252-air-conditioner)
        3. [Fogging](#253-fogging)
3. [Materials and methods](#3-materials-e-methods)
    1. [Programming Languages](#31-programming-languages)
    2. [Frameworks](#32-frameworks)
    3. [Libraries](#33-libraries)
    4. [Algorithm Organization](#34-algorithm-organization)
4. [Case-Study](#4-case-study)
5. [Future Steps](#5-future-steps)
6. [References](#references)

<hr>

## 1. INTRODUCTION

To avoid wasting money and resources while developing any project it is vital to design and size everything based on methods previously described for that. In the agricultural field, that wouldn't be different. If a pivot is sized in the wrong way, it may lead to a colossal loss of water and consequently, energy. Pulling to the energy side, if the number of solar panels is less than what is needed, you may face a lack of energy production. On the same level, if your composting or bio-digesting process doesn't have enough materials, it won't work properly. To avoid all these problems, a good agricultural or biosystems engineer must know how to size and with the assistance of tools, the work gets more simple.

Usually, an engineer uses the purest way to build something: a piece of paper, a pencil and the knowledge. Later, people started to use Excel sheets to enter values and obtain outputs. But nowadays, with the advent and spread of digital technology, many software emerged and are being used to help in that task. However, an agricultural or biosystems engineer knows how to size not only one kind of project aimed at rural interests but many ones, borning the need for software that aggregates all those knowledge areas into one place. That tool also must be accessed with and without the internet due to the lack of network signal at many rural places around the world, with the option to generate reports to save input and output results in no-internet situations.

The perfect match for those needs is a desktop app (DA) which is a software program developed to run on computers and execute a specific task. This task can be entertainment, work tool or gaming; for example, there are YouTube, Netflix, GitHub and many others. All these big companies developing DAs show that this is an option with many advantages for developers and users as well. One of these advantages is that it is made to run in an isolated environment, making it more secure than running on a browser as a web page; also, DAs work without the need for an internet connection, differently than common web applications.

Perceiving all these issues, the objective of this work was to develop a DA to aid agricultural and biosystems engineers during their sizing work. The DA must have a clean and straightforward user interface (UI), work without an internet connection and can generate reports.


<hr>

## 2. LITERATURE REVIEW

### 2.1 Economical Analysis

The economic analysis is calculated using the formulas of (1) simple payback, (2) discounted payback, return on investment (3) and annual profitability (4). All formulas were obtained on the internet from different websites.

* Simple Payback = Initial Investment / Amount Saved per Month (1)
* Discounted Payback = Amount Saved per Month / (1 + Minimum attractive rate) (2)
* Return on Investment = (Gain Obtained - Initial Investment) / Initial Investment (3)
* Annual Profitability = ( Annual Net Income / Total Invested Amount) * 100 (4)
<br>

### 2.2 Irrigation
<br>

#### 2.2.1 Dripping

The dripping sizing was based on the example project in the book "SISTEMAS DE IRRIGAÇÃO LOCALIZADA" by Biscaro et al. (2014), chapter 11, among all mathematical formulas used on Guyri. On, the site is rectangular and aspects of the crop, soil, topography, water and climate were taken. Based on those characteristics, management's variables are calculated. The sectors were pre-defined in the example, but at Guyri, users choose the number of sectors and the algorithm divides the site. Dividing the site takes the measures, length and flow of lateral lines.

The drippers were chosen based on a commercial model. Using Guyri, users can insert drip hose diameters from commercial models or select an algorithm to determine the best diameter. Derivation and Main lines diameters, pressure lost and flow are calculated according to the book's example. On Guyri, all diameters are re-selected based on the closest commercial diameter and pressure lost is re-calculated.

The motor pump and filtering system were calculated according to the book and the outputs are flow, total manometer height, power (for the motor pump) and minimum filtering surface area and minimum filter diameter (for the filtering system). With that information, the engineers can buy the correct motor pump and filtering system (if needed).

The difference between Guyri and the literature is that on the algorithm, sectors are fixed. The consequence of that is sketch format and height can not be changed, limiting the usage for small and simple projects.


<br>

#### 2.2.2 Sprinkling

Sprinkling size was based on the section Aspersao Convencional, written by Geraldo Magela Pereira in the book Irrigacao (2001). On it, differently of dripping size, he displays only the formulas and the step-by-step to obtain the inputs and calculate the outputs of the whole process. Guyri gives users management, secondary line, main line, and motor pump information. Users can select if the sprinkler's positions will be changed and the software will calculate different motor pump flow according to the information to save money by buying a stronger motor pump.

Just like on dripping, the sketch format can't be changed and different heights in the site can't be inputted. But, differently from the dripping size, this part of the software can be used in bigger projects. And, in the same way, the diameters are the commercial ones closest to the calculated's, and the pressure loss is re-calculated using the commercial diameters of pipes.


<br>

#### 2.2.3 Micro-Sprinkling
The reference used in this section was taken from class annotations and slides presented by the author while attending Irrigation's class at the university. The course was ministered by Profa. Dra. Tamara Maria Gomes at Universidade de Sao Paulo - FZEA. On the occasion, she gave a practical example of how to size a micro-sprinkling, providing all formulas and steps. It is not available due to copyrights.

On the micro-sprinkling section in Guyri, the sketch used is shown below, where the main line is on the horizontal top, the derivation lines are vertical and the secondary lines are horizontal. Besides, micro-sprinkling on the software was made mainly to be used on tree crops.

<img src="Icons/Sketch Micro-sprinkling.png">

Just like in the examples above, the diameters are the commercial ones closest to the calculated's, and the pressure loss is re-calculated using the commercial diameters of pipes.


<br>

#### 2.2.4 Central Pivot

For the central pivot, references from de Silva & Azevedo (1998), Almeida (2019) and Junior (2022) were taken. There is a possibility to add a sprinkling canon at the end of the central pivot. On Guyri, every pivot is divided into four sections, with everyone having the same flow. Again, the diameters are the commercial ones closest to the calculated's, and the pressure loss is re-calculated using the commercial diameters of pipes.


<br>

### 2.3 Energy
<br>

#### 2.3.1 Solar Heating

All equations from Solar Heating were taken from the internet on different websites. On Guyri, the total consumption volume is calculated by the sum of the multiplication of the flow, using the time and frequency of use of each piece of equipment. The storage volume is calculated is obtained by the formula (5). Useful energy is obtained according to equation 6. The number of collectors is calculated using energy values from commercial collectors inputted from users and equation 6 and considering losses.

* Storage Volume = (Consumption Volume * (Consumption Temperature - Ambient Temperature)) / (Storage Temperature - Ambient Temperature) (5
* Useful Energy = (Storage Volume * Water Especific Mass * Specific Heat * (Storage Temperature - Ambient Temperature)) / 3600 (6

<br>

#### 2.3.2 Photovoltaic
Both panels and batteries sizing methods were taken and adapted from Freitas (2008) where, in section 3, she presented an example of sizing, giving all formulas. Using Guyri, users can select if they want to size isolated or connected to power line photovoltaic systems.

Users insert information about annual sun hours, panel power, electric tension of batteries, consumption and efficiency on the platform and it calculates the number of panels, inverter power and battery capacity. Hours of the sun are inserted by users, meaning that it can be chosen from the lowest, highest or average number of hours during the year.


<br>

#### 2.3.3 Wind
Wind energy sizing was based on Sales, Belem and Alexandre's paper (2018), where they present sizing methods for popular houses. Just like photovoltaic systems, the wind has the option to add batteries, allowing it to be off-grid. References for battery system sizing were taken from Freitas (2008). Calculations to generate power were based on wind power itself, not using a generator. Engineers using the program must pay attention to that detail.


<br>

#### 2.3.4 Hydroelectric
The references for this section were taken from Bergamo (2018). In her work, she compiled formulas and methods of sizing to the following turbines: Pelton, Francis, Kaplan and Michell-Blanki.

On Guyri, first, users fill out a form with basic information about the site and the turbine. Using that information, the algorithm selects the turbine types that would fit on the form filled, and then, users choose the one they prefer.


<br>

### 2.4 Biological Systems

<br>

#### 2.4.1 Biodigester
The biodigester that can be sized using Guyri is of tubular style, just like the picture below. All formulas and instructions were used from Goncalves et al. (2018), with the difference that, on Guyri algorithm, it is possible to select swine and cattle, instead of just cattle like in the literature reference

<img src="Icons\Biodigester.png"></img>

<br>

#### 2.4.2 Composter
The formulas and methodology to be used in the composter section were based on Embrapa's sheet, under the responsibility of Leal (2018). On the sheet, are available instructions, formulas and calculation methods to obtain the ideal ratio of C:N for the composting process.


<br>

### 2.5 Protected
<br>

#### 2.5.1 Forced Ventilation
Forced ventilation section formulas' and process' were obtained and based on Abreu & Abreu (2000) book. On it, they demonstrate how to size ventilation systems for poultry farming. The objective is to use air pushed from fans to remove the heat from inside a building.

<br>

#### 2.5.2 Air Conditioner

The Air Conditioner sizing method was taken from the internet from various websites. To calculate the number of BTUs required, Guyri uses reference fixed values for windows' display, number of people and equipment and site area.

<br>

#### 2.5.3 Fogging
Fogging refrigeration system sizing was obtained from annotations of Prof. Dr. Iran Jose Oliveira da Silva class in 2013. He is a professor at the University of Sao Paulo - ESALQ. On the occasion, he gave an example of sizing to calculate the number of fogging nozzles for poultry farming. To use some variables in the formulas, it was necessary to have values obtained from curves. Using as reference Dantas (2012), curve equations were generated and, in that way, values could be obtained.


<br>
<hr>

## 3. MATERIALS E METHODS
<br>

### 3.1 Programming Languages
Guyri was developed using JavaScript, CSS and HTML. JavaScript was used to make make the calculations appear more from sections and remove those on Solar Heating and Composting. Besides that, was also used to change the display block to none on some divisions of HTML, and Electron configurations as well. Almost all styling was made using CSS, including the appearance of the lateral and main menus. Colors, centralization and appearance changes are also due to CSS. The "skeleton" of the DA was made using HTML, separating into divisions and allowing CSS to stylize Guyri.

<br>

### 3.2 Frameworks
Bootstrap, a CSS and JavaScript-based framework from Twitter, was responsible for the modals that appear when the user clicks on the "Size!" button.

The Electron framework is responsible to make an HTML-CSS-JavaScript project into a DA. To use it is necessary to create an npm project into a folder using the command on a terminal:
<code>npm init</code> and, after the project is created, enter the following command on the terminal:

<code>npm i electron (name of your project)</code>
After creating the node_modules folder, it is necessary to go to scripts in package.json and write:

<code>"start": "electron ."</code>
After that, is necessary to work on the main JavaScript file to configure the app. To make it start working and test it is necessary to go on the terminal and type:

<code>npm start</code>

After finishing the app, to publish it, is needed to follow the instructions on this <a href = "https://www.christianengvall.se/electron-packager-tutorial/">website</a>.

In Guyri, it was followed, generating the need of running the following commands on the terminal line:

<code>npm install electron-packager --save-dev</code>
And this one:

<code>npm install --save-dev electron</code>

After that, was needed to go to the package.json file and add, inside scripts, the following line (for Windows): 

<code>"package-win": "electron-packager . Guyri --overwrite --asar=true --platform=win32 --arch=x64 --icon=Icons/Logotipo-2.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Guyri\""</code>
Where: "--arch=x64" means the architecture of the system.

In the functions.js file, a function has to be added to make Electron works. In the function also there is the possibility to change some settings of the DA, such as window size, and the navigation tab at the top.

To deploy the app the command was written on the terminal:

<code>npm run package-win</code>

<br>

### 3.3 Libraries
Two libraries were used on Guyri: html2pdf and chart.js. The first one is responsible to convert the results modal made using Bootstrap into a pdf file, letting users have the inputs and outputs of their sizing on a savable pdf file. The second one generates the chart that compares the "Simple vs Discounted payback" in the Economical Analysis section.

<br>

### 3.4 Algorithm Organization
In the main folder, there are the functions, index and style algorithms, being these the main ones. In the folder called Sizing Pages is each sizing html algorithm. The icons used were downloaded from the internet and are in the folder Icons. Lastly, the SizingTutorials folder has the pdf of some of the tutorials mentioned in the Literature Review.
<br>
<hr>

## 4. CASE STUDY

 Mrs. Maria Carolina has just graduated from Biosystems Engineering and, to start her life in the ag field, bought a farm. On her farm, she will raise dairy and beef cattle and plant soy and corn. She was a smart student who used to pay attention in all her classes. Because of that, she knows how to size some things she will need, but not all, might need some help.

Her farm is located in Goias state, Brazil. The place is new and doesn't have internet connections and since is far away from cellphone companies, doesn't have a telephone signal. She can't access the internet to help her, therefore, she is an ARA client and in consequence, has the right to use Guyri to help her with sizing issues.

The following are the particularities of the farm:

<ul>* 100 dairy cattle confined in a shed</ul>
<ul>* Square arable site of 330m on each side with a height difference of 5 meters</ul>
<ul>* Average of 5.5 hours of sun daily, but not much wind</ul>
<ul>* Silty Soil</ul>
<ul>* Connection with the electrical net</ul>
<ul>* Easy access to water, but without waterfalls</ul>
 With that information, she decided to: irrigate the arable land under a pivot and, in the same area, plant the soy, and corn and raise the beef cattle; due to the warmth of the place, she will install a forced ventilation system for her dairy and, to not waste the manure, will install a biodigester to take the fertilizer and gas from it; she is not sure if worth to install a solar energy system, so she will check the economical viability of it. Since the place is far away from the city, and doesn't have internet she will use the Guyri DA to size everything and take the PDF reports to the city afterward 


Maria Carolina used Guyri inside her property and could get the inputs and outputs from all sizing projects she made. With that, she could know:

<ul>-> Everything she needs to build the hydraulic and motor pump of the central pivot;</ul>
<ul>-> The number of fans and an open area to insert inside the shed for dairy cattle;</ul>
<ul>-> Amount of water to add daily and dimensions of biodigester to be built;</ul>
<ul>-> That, by the current price of energy in her region and price of panels, solar energy will be worth the investment and;</ul>
<ul>-> Number of panels and inverter power she will need to buy.</ul>

<hr>

## 5. FUTURE STEPS
In the future, there will be the need of connecting all the sizes of inputs and outputs to a database (DB). This way, the client can synchronize with the cloud when the internet is available and transfer everything to the DB, generating historical. To make a connection to the cloud and client DB possible, is essential to have a backend algorithm working on a server assuring client-DB-Guyri relationships.

Some sections must be more complete and/or have more details. Economical Analysis must be incremented and more complete, making more different analyses possible. Since on Irrigation section is only possible to size on rectangular or square sites, it is important to think of a way to break down this limitation. As an idea, users could draw on a map the main, derivation and secondary lines as well as the dripping or micro-sprinkling sectors. Another thing would be to add more than one source of straw on Composter, but, to do that, a complex mathematical accounts template must be added. Maybe the user wants another bio-digestion system, opening the need for more biodigester models to be added on Guyri.


<hr>

## REFERENCES

Biscaro, Guilherme A. et al. SISTEMAS DE IRRIGAÇÃO LOCALIZADA. Ed. UFGD - Dourados, MS (2014). ISBN: 978-85-8147-085-6, 256p.

PEREIRA, G. M. . IRRIGAÇÃO POR ASPERSÃO CONVENCIONAL. Lavras-MG: UFLA, 2001 (APOSTÍLA).

SILVA, E.M. da; AZEVEDO, J.A. de. Dimensionamento da lateral de irrigação do pivô-central. Planaltina: Embrapa-CPAC, 1998. 54p.

Almeida, Isabela Alvarenga. Dimensionamento econômico para sistemas de irrigação pivô central telescópico: estudos de cenários para diferentes regiões do Brasil. Dissertação (Mestrado) - - USP / Escola Superior de Agricultura “Luiz de Queiroz", Piracicaba, 2019. 92 p.

Junior, Joao B. Tolentino. Irrigacao Pressurizada. Online Book. Available at: <a href="https://irrigacao.tolentino.pro.br/">https://irrigacao.tolentino.pro.br/</a>

Freitas, Susana S. A. Dimensionamento de sistemas fotovoltaicos. Relatorio de projecto para obtencao do grau de Mestre em Engenharia Industrial. Instituto Politecnico de Braganca, 2008, 105p.

Sales, Maria E. de O.; Belem, Gabriel da S. & Alexandre, Geronimo B. Dimensionamento um sistema eolico isolado para casas populares. CONTECC, Maceio-AL, Brasil, August 21 to 24 of 2018.

BERGAMO, Paula R. Specifications of hydraulic turbines. 2018. 72f.Course Completion work - Course in Electrical Engineering, Universidade Tecnológica Federal do Paraná. Pato Branco, 2018.

Leal, Marco A. de A. Calculo de Compostagem. Embrapa, available at: <a href="https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fciorganicos.com.br%2Fwp-content%2Fuploads%2F2017%2F10%2FPlanilha-de-calculo-de-compostagem-Embrapa-Agrobiologia-22.SNA_.OrganicsNet.CI-Organicos-22.xlsx&wdOrigin=BROWSELINK">https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fciorganicos.com.br%2Fwp-content%2Fuploads%2F2017%2F10%2FPlanilha-de-calculo-de-compostagem-Embrapa-Agrobiologia-22.SNA_.OrganicsNet.CI-Organicos-22.xlsx&wdOrigin=BROWSELINK</a>

ABREU, P.G. de; ABREU, V.M.N. Ventilação na avicultura de
corte. Concórdia: Embrapa Suínos e Aves, 2000. 50p.

Dantas, Luís Antônio. Soluções computacionais analítico-numéricas aplicadas à simulação de secagem de produtos biológicos. Tese (Doutorado em Engenharia de Processos) - Universidade Federal de Campina Grande, Centro de Ciências e Tecnologia, 2012, 124p.
