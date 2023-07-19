window.onload = function() {
    // Navbar Code
        document.querySelector(".nav-btn").onclick = openMenu;

        function openMenu() {
            this.classList.toggle("openNav");
        }
    // End Navbar Code

    // Select Menu Elements //
        document.querySelectorAll(".Menu li").forEach(function(array_elem) {
            array_elem.onclick = function() {
                document.querySelectorAll(".Menu li").forEach(function(elem,c) {
                    document.querySelectorAll(".Menu li")[c].classList.remove("activeTab");
                });

                this.classList.add("activeTab");
                info(this);
            }
        });
    // End Select Menu Elements //

    // Update Info
        function info(elemLi) {
            // Variables
            var categories = {};
            var option,input,i,j;
            var inputs_con = document.querySelector(".inputs_con");
            var allCategories = document.querySelector(".select_cat");
            var formulaArea = document.querySelector(".formula_area");
            var elemText = elemLi.innerText.toLowerCase();
            var userInputs = [];
            var result = 0;


            // Categories
            if(elemText.toLowerCase() == "triangle")
                categories = {
                    area : ["1/2bh","base","height"],
                    perimeter : ["A + B + C","side a","side b","side c"]
                };

            else if(elemText.toLowerCase() == "circle")
                categories = {
                    area : ["&pi;r<sup>2</sup>","radius"],
                    perimeter : ["2&pi;r","radius"],
                    diameter : ["2r","radius"]
                };

            else if(elemText.toLowerCase() == "square")
                categories = {
                    area : ["s<sup>2</sup>","any side value"],
                    perimeter : ["4s","any side value"]
                };

            else if(elemText.toLowerCase() == "rectangle")
                categories = {
                    area : ["LW","length","width"],
                    perimeter : ["(2L) + (2W)","length","width"]
                };

            // Empty All Data
            allCategories.innerHTML = "";

            // Updating Info
            document.querySelector(".cat_name").innerHTML = elemText;
            document.querySelector(".right-con img").src = "img/"+String(elemText).toLowerCase()+".png";
        
            // Update Each Category
            Object.keys(categories).forEach(function(prop_name) {
                option = document.createElement("option");
                option.innerHTML = prop_name;
                allCategories.appendChild(option);
            });

            // Get Formula And Input Fields
            allCategories.onchange = function() {
                var subcat_name = this.value.toLowerCase();
                var formula = categories[subcat_name][0];
                getFormula(subcat_name,formula);
            }

            function getFormula(subcat_name,formula) {
                document.querySelector(".result").innerHTML = "";
                document.querySelector(".msg").innerHTML = "";
                inputs_con.innerHTML = "";
                formulaArea.innerHTML = subcat_name.toUpperCase()+"<br>"+formula;

                for(i = 1; i < categories[subcat_name].length;i++) {
                    input = document.createElement("input");
                    input.placeholder = categories[subcat_name][i];
                    input.type = "number";
                    inputs_con.appendChild(input);
                }
            }

            getFormula(allCategories.value,categories[allCategories.value.toLowerCase()][0]);

            // Get Result
            document.querySelector(".getResult").onclick = function() {
                var allfields = document.querySelectorAll(".inputs_con input");
                userInputs = [];
                j = 0;
                for(i = 0;i < allfields.length;i++) {
                    if(allfields[i].value == "") {
                        ++j;
                        document.querySelector(".msg").innerHTML = "Some Field Are Empty!";
                        document.querySelector(".result").innerHTML = "";
                        break;
                    }
                }

                for(i = 0; i < allfields.length;i++) {
                    if(j == 0) {
                        document.querySelector(".msg").innerHTML = "";
                        userInputs.push(Number(allfields[i].value));
                    }
                }

                if(userInputs != "") {
                    result = getResult(elemText,allCategories.value,userInputs);
                    document.querySelector(".result").innerHTML = allCategories.value.toUpperCase()+" = "+result;
                }
            }

            function getResult(cat_name,subcat_name,inputs = []) {

                if(cat_name == "triangle")
                {
                    if(subcat_name == "area")
                        result = 1/2*(inputs[0]*inputs[1]);
                    else if(subcat_name == "perimeter")
                        result = inputs[0]+inputs[1]+inputs[2];
                }

                else if(cat_name == "circle")
                {
                    if(subcat_name == "area")
                        result = 22/7*inputs[0]*inputs[0];
                    else if(subcat_name == "perimeter")
                        result = 2*22/7*inputs[0];
                    else if(subcat_name == "diameter")
                        result = 2*inputs[0];
                }

                else if(cat_name == "square")
                {
                    if(subcat_name == "area")
                        result = inputs[0]*inputs[0];
                    else if(subcat_name == "perimeter")
                        result = 4*inputs[0];
                }

                else if(cat_name == "rectangle")
                {
                    if(subcat_name == "area")
                        result = inputs[0]*inputs[1];
                    else if(subcat_name == "perimeter")
                        result = (2*inputs[0])+(2*inputs[1]);
                }

                return result;
            }
        }
    // End Update Info

    // Starting Tab
        document.querySelector(".Menu li").click();
    // End Starting Tab
}
