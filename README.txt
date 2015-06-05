-------------
Copy to Host:
-------------
There is a demand for HTTP “GET” while loading and processing the external data set in order to 
do the visualisation with d3 javascript library. The website was hosted onto the ECS web space 
http://user.ecs.soton.ac.uk/bg2g14 through the “public_html” folder on the network disk. Main page
to be opened is "index.html" in the folder "ASS1".
##Way of Hosting##
*Folder Name:	"ASS1"
	*CSS/
	*data/
	*font-awesome/
	*fonts/
	*img/
	*index.html
	*js/
	*README.txt

--------------------------------------------------------------------
Data Cleaning (Detailed on http://users.ecs.soton.ac.uk/bg2g14/ASS1)
--------------------------------------------------------------------

+-----------------------------+--------------------------------------------+--------------------------------------------+--------------------------------------------------------+
| Data Errors                 | Description                                | Consideration                              | Action                                                 |
+-----------------------------+--------------------------------------------+--------------------------------------------+--------------------------------------------------------+
| Data Validation             | The mix use of date format like            | Important for analysing the trend          | Atomically transform the date format with              |
|                             |  “dd/mm/yyyy” and “yyyy-mm-dd”             | with the specific time scale.              | Google Refine with the function “todate”.              |
|                             | could cause the confusion.                 |                                            |                                                        |
+-----------------------------+--------------------------------------------+--------------------------------------------+--------------------------------------------------------+
| Multiple Representations    | Multiple representations especially        | Incredibly inconvenient while transform    | The automatic tool “cluster” could merge               |
|                             |  for the same Department like              | the data into meaningful information.      | between each different terms of the same Department.   |
|                             | “Department of Agriculture” and            |                                            |                                                        |
|                             | “Agriculture Department”.                  |                                            |                                                        |
+-----------------------------+--------------------------------------------+--------------------------------------------+--------------------------------------------------------+
| Summation Recordds          | The meaningless data like the “Total”      | Another form of the redundant data         | Directly delete.                                       |
|                             | to sum the summary of each Department.     | which could be disposable .                |                                                        |
+-----------------------------+--------------------------------------------+--------------------------------------------+--------------------------------------------------------+
| Mix use of numerical scales | The key costs for same project have        | Difficult to decide which exact cell to be | In consideration of the difficulty deciding            |
|                             | significant difference between each        | edited in order to correct the data set.   |  which one is mistaken with wrong input,               |
|                             |  other due to the uniformed units like     |                                            | the direct delete was applied for similar situations.  |
|                             | “8127” for lifecycle cost but only “8.127” |                                            |                                                        |
|							  |	on the actual cost.						   |											|														 |
+-----------------------------+--------------------------------------------+--------------------------------------------+--------------------------------------------------------+
| Wrong lines                 | One group of the data set was shifted to   | The whole data set was in a chaos for not  | The Excel was used for moving the shifted 			 |
|                             | right with 6 columns in total.             | matching all the columns to each table 	| group of data to the correct place where believed  	 |
|							  |											   |title.										| to be corrected.										 |
+-----------------------------+--------------------------------------------+--------------------------------------------+--------------------------------------------------------+


------------------
Data Visualization
------------------

##The First Visualization##

The single Line group was designed for observing the “LifeCycle Cost” of each Department through the year. 
With the selection (“click”) on the radio button legend, the corresponding graph would be presented with a 
precious scale. The “LIfeCycle Cost” of each Department could be clearly presented and analysed regarding the 
increasing or decreasing trend. 
In this case, the target user would be those who care about the actual cost of 
different Departments throughout each year in order to understand the basic trend as well as the situations 
across the time.

##The Second Visualization##

Similarly, the “LifeCycle  Cost” of each Department was displayed in bar chart and correspondingly the Scatter 
chart would have certain interactions according to the “year” selected from the bar chart. The Scatter chart was 
designed for comparing the “Actual Cost” and “Planned Cost” on each project. The interactions between the 
legend in the middle and both of the scatter chart, bar chart are to be changed accordingly.
In this case, the user would be more concentrated on concerning the balance between planned cost and actual/project 
cost in order to observer which exact project under the specific Department exceeded the budget significantly 
compared with what was planned correspondingly with the year selected from the Bar chart.


==================================================================================================================
Copyright 2014 Bingjie Gao more detailed visualization on http://users.ecs.soton.ac.uk/bg2g14/ASS1












