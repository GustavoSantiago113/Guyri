# Guyri: A desktop app to size several agricultural engineer projects

<p>Author: Eng. Gustavo Santiago</p>
<p>Contact: gustavosantiago@usp.alumni.br</p>

<hr>

## 1. INTRODUCTION
<p>In order to avoid wasting money and resources while developing any project it is vital to design and size everything based on methods previously described for that. In agricultural field, that wouldn't be different. If a pivot is sized in a wrong way, it may lead to a colossal loss of water and consequently, energy. Pulling to energy side, if the number of solar panels is less than what is needed, you may face a lack of energy production. In the same level, if your composting or biodigesting process don't have enough materials, it won't work properly. With the purpose of avoiding all these problems, a good agricultural or biosystems engineer must know how to size and with the assistance of tools, the work gets more simple.</p>
<p>Usually an engineer uses the purest way to build something: a piece of paper, pencil and the knowledge. Later, people started to use excel sheets to entry values and obtain the outputs. But nowadays, with the advent and spread of digital technology, many softwares emerged and are being used to help in that task. However, an agricultural or a biosystems engineer has knowledge to size not only one kind of project aimed to rural interests but many ones, borning the need of a software that aggregates all those knowledge areas into one place. That tool also must be accessed with and without internet due to lack of network signal at many rural places around the world, with the option to generate reports in order to save input and output results on no-internet situations.</p>
<p>The perfect macth for those needs is a desktop app (DA) which is a software program developed to run on computers and execute a specific task. This task can be entertainment, work tool or gaming; as examples, there are YouTube, Netflix, Github and many others. All this big companies developing DAs show that this is a option with many advantages for developers and for users as well. One of this advantage is that it is made to run on isolated environment, making it more secure than running on a browser as a web page; also, DAs work without the need of internet connection, differently than common web applications.</p>
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

<p>The dripping sizing was based on the example project as on the book "SISTEMAS DE IRRIGAÇÃO LOCALIZADA" from Biscaro et al. (2014), chapter 11, among all mathematical formulas used on Guyri. On it, the site is rectangular and aspects of the crop, soil, topography, water and climate were taken. Based on those characteristics, management's variables are calculated. The sectors were pre-defined in the example, but at Guyri, users' choose the number of sectors and the algorithm divides the site. Dividing the site, it takes the measures, lenght and flow of lateral lines.</p>
<p>The drippers were chosen based on a commercial model. Using Guyri, users' can insert drip hoses diameter from commercial models or select to algorithm to determine the best diameter. Derivation and Main lines diameters, pressure lost and flow are calculated according to book's example. On Guyri, all diameters are re-selected based on the closest commercial diameter and pressure lost re-calculated.</p>
<p>Motor pump and filtering system were calculated according to the book and the outputs are flow, total manometer height, power (for motor pump) and minimum filtering surface area and minimum filter diameter (for filtering system). With those informations, the engineers are able to buy the correct motor pump and filtering system (if needed).</p>
<p>The difference between Guyri and the literature is that on the algorithm, sector are fixed. The consequence of that is sketch format and height can not be changed, limitating the usage for small and simple projects.</p>

<br>

#### 2.2.2 Sprinkling

<p>Sprinkling size was based on section Aspersao Convencional, wrote by Geraldo Magela Pereira on the book Irrigacao (2001). On it, differently of dripping size, he displays only the formulas and the step by step to obtain the inputs and calculate the outputs of the whole process. Guyri gives to users' management, secondary line, main line, motor pump informations. Users' have the possibility to select if the sprinklers positions will be changed and the software will calculate different motor pump flow according to the information in order to save money buying a stronger motor pump.</p>
<p>Just like on dripping, the sketch format can't be changed and differnt heights in the site can't be inputed. But, differently of the dripping size, this part of software can be used in bigger projects.

#### 2.2.3 Micro-Sprinkling
#### 2.2.4 Central Pivot

### 2.3 Energy
#### 2.3.1 Solar Heating
#### 2.3.2 Fotovoltaic
#### 2.3.3 Wind
#### 2.3.4 Hydroelectric

### 2.4 Biological Systems
#### 2.4.1 Biodigester
#### 2.4.2 Composter

### 2.5 Protecteds
#### 2.5.1 Forced Ventilation
#### 2.5.2 Air Conditioner
#### 2.5.3 Fogging

<hr>

## 3. MATERIALS E METHODS
### 3.1 Programing Languages
### 3.2 Frameworks
### 3.3 Libraries
### 3.4 Algorithm Organization

<hr>

## 4. CASE STUDY

<p> Mrs. Ana, a biosystems engineer bought a farm and uses every branch to size what she needs </p>

<hr>

## 5. FUTURE STEPS
<p> Back-End and database conexion</p>
<p> More site formats on irrigation and biodigestor </p>
<p> Economical Analysis fancier </p>

<hr>

## REFERENCES

<p>Biscaro, Guilherme A. et al. SISTEMAS DE IRRIGAÇÃO LOCALIZADA. Ed. UFGD - Dourados, MS (2014). ISBN: 978-85-8147-085-6, 256p.</p>
<p>PEREIRA, G. M. . IRRIGAÇÃO POR ASPERSÃO CONVENCIONAL. Lavras-MG: UFLA, 2001 (APOSTÍLA).</p>