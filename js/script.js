const request = {CREATE: "Create", READ: "Get", UPDATE: "Edit", DESTROY: "Delete"};

const database = {PERSONNEL: "Personnel", DEPARTMENT: "Department", LOCATION: "Location"};

const filenamePHP   = {
    CREATE_PERSONNEL:        "insertPersonnel",       CREATE_DEPARTMENT:      "insertDepartment",     CREATE_LOCATION: "insertLocation",
    READ_PERSONNEL:          "readPersonnel",         READ_DEPARTMENT:        "readDepartment",       READ_LOCATION: "readLocation",
    UPDATE_PERSONNEL:        "updatePersonnel",       UPDATE_DEPARTMENT:      "updateDepartment",     UPDATE_LOCATION: "updateLocation",
    DESTROY_PERSONNEL:       "deletePersonnel",       DESTROY_DEPARTMENT:     "deleteDepartment",     DESTROY_LOCATION: "deleteLocation"
};

const filter = {PERSONNEL: "Personnel", DEPARTMENT: "Department", LOCATION: "Location", NONE: "na"}

const sortByPHP = {ID: "id", FIRSTNAME: "firstName", LASTNAME: "lastName", JOBTITLE: "jobTitle", EMAIL:"email", DEPARTMENTID: "departmentID", DEPARTMENT: "departmentName", LOCATIONID: "locationID", LOCATION: "locationName"}

let mobileDevice;

$(document).ready(function(){
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? mobileDevice = true : mobileDevice = false;
    mobileDevice ? $("#desktop").attr("class", "hidden") : $("#mobile").attr("class", "hidden");
    personnelViewButton();
    contentFilter();
    modalButtons();
});

function personnelViewButton()      {ajaxCRUD(filenamePHP.READ_PERSONNEL).then( result => pageView(database.PERSONNEL,  result));}
function departmentsViewButton()    {ajaxCRUD(filenamePHP.READ_DEPARTMENT).then(result => pageView(database.DEPARTMENT, result));}
function locationsViewButton()      {ajaxCRUD(filenamePHP.READ_LOCATION).then(  result => pageView(database.LOCATION,   result));}

function refresh(databaseType) {
    if      (databaseType == database.PERSONNEL ) {personnelViewButton();}
    else if (databaseType == database.DEPARTMENT) {departmentsViewButton();}
    else if (databaseType == database.LOCATION  ) {locationsViewButton();}
}

function contentFilter() {
    $("#searchData").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        
        if(!mobileDevice) {
            $(".slide").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        } else if (mobileDevice) {
            $(".accordion-item").filter(function() {
                $(this).toggle($(this).attr("filterTerms").toLowerCase().indexOf(value) > -1)
            });
        }

    });
}

async function ajaxCRUD(filenamePHP, id="na", first="na", last="na", job="na", email="na", depID="na", dep="na", locID="na", loc="na", filterPHP="na", filterID="na", sortByPHP1="na", sortByPHP2="na") {
    return await $.ajax({
        url: "php/" + filenamePHP + ".php",
        type: 'POST',
        dataType: 'json',
        data: {
            $id:                id,
            $firstName:         first,
            $lastName:          last,
            $jobTitle:          job,
            $email:             email,
            $departmentID:      depID,
            $departmentName:    dep,
            $locationID:        locID,
            $locationName:      loc,
            $filterPHP:         filterPHP,
            $filterID:          filterID,
            $sortByPHP1:        sortByPHP1,
            $sortByPHP2:        sortByPHP2
        },
        success: function(result) {
            if (result.status.name == "ok") {
                return result;
            };
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

function pageView(db, data) {
    clearRHS();
    clearInputs();
    scrollTop();
    
    if(!mobileDevice) {
        const size = data["data"].length;
        $("#divListDataRow").empty();
        $("#buttonNewData").attr("view", db);
        $("#panelPersonnel").attr("class", "hidden");
        $("#panelDepartment").attr("class", "hidden");
        $("#panelLocation").attr("class", "hidden");  
        $("#buttonEdit").attr("disabled", true);
        $("#buttonDelete").attr("disabled", true);

        switch(db) {
            case database.PERSONNEL:
                $("#buttonNewData").html("<i class='fas fa-user-plus'></i>");
                $("#buttonNewData").attr("onclick", "createPersonnel();");
                $("#buttonEdit").html("<i class='fas fa-user-edit'></i>");
                $("#buttonDelete").html("<i class='fas fa-user-minus'></i>");
                $("#divBackgroundImage").attr("class", "personnelBackground");
                $("#panelPersonnel").attr("class", "panel container containerFullWidth");
                slidePersonnel(data);
            break;

            case database.DEPARTMENT:
                $("#buttonNewData").html("<i class='fas fa-folder-plus'></i>");
                $("#buttonNewData").attr("onclick", "createDepartment();");
                $("#buttonEdit").html("<i class='fas fa-pencil-alt'></i>");
                $("#buttonDelete").html("<i class='fas fa-trash-alt'></i>");
                $("#divBackgroundImage").attr("class", "departmentBackground");
                $("#panelDepartment").attr("class", "panel container containerFullWidth");
                slideDepartment(data);
            break;

            case database.LOCATION:
                $("#buttonNewData").html("<i class='fas fa-folder-plus'></i>");
                $("#buttonNewData").attr("onclick", "createLocation();");
                $("#buttonEdit").html("<i class='fas fa-pencil-alt'></i>");
                $("#buttonDelete").html("<i class='fas fa-trash-alt'></i>");
                $("#divBackgroundImage").attr("class", "locationBackground");
                $("#panelLocation").attr("class", "panel container containerFullWidth");
                slideLocation(data);
            break;
            default: break;    
        }
    } else if(mobileDevice) {
        $("#mobileView").empty();

        switch(db) {

            case database.PERSONNEL:
                $("#buttonNewData").html("<i class='fas fa-user-plus'></i>");
                $("#buttonNewData").attr("onclick", "createPersonnel();");
                mobilePersonnel(data);
            break;

            case database.DEPARTMENT:
                $("#buttonNewData").html("<i class='fas fa-folder-plus'></i>");
                $("#buttonNewData").attr("onclick", "createDepartment();");
                mobileDepartment(data);
            break;

            case database.LOCATION:
                $("#buttonNewData").html("<i class='fas fa-folder-plus'></i>");
                $("#buttonNewData").attr("onclick", "createLocation();");
                mobileLocation(data);
            break;

            default: break;    
        }        
    }
}


function digitsLen(databaseType, id) {
    const digits = id.toString().length;
    if(databaseType == database.PERSONNEL)  {return digits === 1 ? "000" + id   : digits === 2 ? "00" + id  : digits === 3 ? "0" + id : "" + id;}
    if(databaseType == database.DEPARTMENT) {return digits === 1 ? "00" + id    : digits === 2 ? "0" + id   : "" + id;}
    if(databaseType == database.LOCATION)   {return digits === 1 ? "0" + id     : "" + id;}
}

function personnelDetails(id) {
    ajaxCRUD(filenamePHP.READ_PERSONNEL, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, filter.PERSONNEL, id).then(result => {
        const data = result["data"][0];
        const digits = digitsLen(database.PERSONNEL, data["id"]);
        $("#valuePersonnelID").val(digits);
        $("#valueFirstName").val(data["firstName"]);
        $("#valueLastName").val(data["lastName"]);
        $("#valueJobTitle").val(data["jobTitle"]);
        $("#valuePhone").val(data["phone"]);
        $("#valueEmail").val(data["email"]);
        $("#valueDepartment").val(data["department"]);
        $("#valueLocation").val(data["location"]);

        $("#buttonEdit").attr("onclick", "editPersonnel(" + data["id"] + ");");
        $("#buttonDelete").attr("onclick", "deletePersonnel(" + data["id"] + ");");
        $("#buttonEdit").attr("disabled", false);
        $("#buttonDelete").attr("disabled", false);
    });
}

function departmentDetails(id) {
    ajaxCRUD(filenamePHP.READ_DEPARTMENT, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, filter.DEPARTMENT, id).then(result => {
        const data = result["data"][0];
        const digits = digitsLen(database.DEPARTMENT, data["id"]);
        $("#valueDepartmentID").val(digits);
        $("#valueDepartmentName").val(data["name"]);
        $("#valueDepartmentLocation").val(data["location"]);
        $("#buttonEdit").attr("onclick", "editDepartment(" + data["id"] + ");");
        $("#buttonDelete").attr("onclick", "deleteDepartment(" + data["id"] + ");");
        $("#buttonEdit").attr("disabled", false);
        $("#buttonDelete").attr("disabled", false);
    });
}

function locationDetails(id) {
    ajaxCRUD(filenamePHP.READ_LOCATION, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, filter.LOCATION, id).then(result => {
        const data = result["data"][0];
        const digits = digitsLen(database.LOCATION, data["id"]);
        $("#valueLocationID").val(digits);
        $("#valueLocationName").val(data["name"]);
        $("#buttonEdit").attr("onclick", "editLocation(" + data["id"] + ");");
        $("#buttonDelete").attr("onclick", "deleteLocation(" + data["id"] + ");");
        $("#buttonEdit").attr("disabled", false);
        $("#buttonDelete").attr("disabled", false);
    });
}

function createPersonnel() {
    clearInputs();
    $("#personnelCreateEditInterface").modal("show");
    $("#headerCreateEditPersonnel").html("New Personnel");
    ajaxCRUD(filenamePHP.READ_DEPARTMENT).then(data => populateSelectOptions("#selectDepartment", data, database.DEPARTMENT, undefined, "Department"));
    $("#acceptCreateEditPersonnel").attr("onclick", "toggleConfirm('" + database.PERSONNEL + "', '" + request.CREATE + "');");
    $('#selectDepartment').trigger('input');
}

function editPersonnel(id) {
    clearInputs();
    ajaxCRUD(filenamePHP.READ_PERSONNEL, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, filter.PERSONNEL, id).then(result => {
        const info = result["data"][0];
        $("#personnelCreateEditInterface").modal("show");
        $("#headerCreateEditPersonnel").html("Edit Personnel");
        $("#inputPersonnelFirstName").val(info["firstName"]);
        $("#inputPersonnelLastName").val(info["lastName"]);
        $("#inputPersonnelEmail").val(info["email"]);
        $("#inputPersonnelJobTitle").val(info["jobTitle"]);
        ajaxCRUD(filenamePHP.READ_DEPARTMENT).then(data => {
            populateSelectOptions("#selectDepartment", data, database.DEPARTMENT, info["department"], "Department");
            $("#acceptCreateEditPersonnel").attr("onclick", "toggleConfirm('" + database.PERSONNEL + "', '" + request.UPDATE + "', '" + id + "');");
            $('#personnelValidate').validator('validate');
        });
    });
}

function deletePersonnel(id) {
    toggleConfirm(database.PERSONNEL, request.DESTROY, id);
}

function createDepartment() {
    clearInputs();
    $("#departmentCreateEditInterface").modal("show");
    $("#headerCreateEditDepartment").html("New Department");
    ajaxCRUD(filenamePHP.READ_LOCATION).then(data => populateSelectOptions("#selectDepartmentLocation", data, database.LOCATION, undefined, "Location"));
    $("#acceptCreateEditDepartment").attr("onclick", "toggleConfirm('" + database.DEPARTMENT + "', '" + request.CREATE + "');");
    $('#selectDepartmentLocation').trigger('input');
}

function editDepartment(id) {
    $('#acceptCreateEditPersonnel').removeAttr("disabled");
    clearInputs();
    ajaxCRUD(filenamePHP.READ_DEPARTMENT, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, filter.DEPARTMENT, id).then(result => {
        const info = result["data"][0];
        $("#departmentCreateEditInterface").modal("show");
        $("#headerCreateEditDepartment").html("Edit Department");
        $("#inputDepartmentName").val(info["name"]);
        ajaxCRUD(filenamePHP.READ_LOCATION).then(data => {
            populateSelectOptions("#selectDepartmentLocation", data, database.LOCATION, info["location"], "Location");
            $("#acceptCreateEditDepartment").attr("onclick", "toggleConfirm('" + database.DEPARTMENT + "', '" + request.UPDATE + "', '" + id + "');");
            $('#departmentValidate').validator('validate');
        });
    });
}

function deleteDepartment(id) {
    toggleConfirm(database.DEPARTMENT, request.DESTROY, id);
}

function createLocation() {
    clearInputs();
    $("#locationCreateEditInterface").modal("show");
    $("#headerCreateEditLocation").html("New Location");
    $("#acceptCreateEditLocation").attr("onclick", "toggleConfirm('" + database.LOCATION + "', '" + request.CREATE + "');");
    $("#silentValidate").trigger("input");
}

function editLocation(id) {
    clearInputs();
    ajaxCRUD(filenamePHP.READ_LOCATION, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, filter.LOCATION, id).then(result => {
        const info = result["data"][0];
        $("#locationCreateEditInterface").modal("show");
        $("#headerCreateLocation").html("Edit Location");
        $("#inputLocationName").val(info["name"]);
        $("#acceptCreateEditLocation").attr("onclick", "toggleConfirm('" + database.LOCATION + "', '" + request.UPDATE + "', '" + id + "');");
        $('#locationValidate').validator('validate');
    });
}

function deleteLocation(id) {
    toggleConfirm(database.LOCATION, request.DESTROY, id);
}

function clearInputs() {
    $("#inputPersonnelFirstName").val("silent");
    $("#inputPersonnelLastName").val("silent");
    $("#inputPersonnelEmail").val("silent@gmail");
    $("#inputPersonnelJobTitle").val("silent");
    $("#inputDepartmentName").val("silent");
    $("#inputLocationName").val("silent");

    $('#inputPersonnelFirstName').trigger('input');
    $('#inputPersonnelLastName').trigger('input');
    $('#inputPersonnelEmail').trigger('input');
    $('#inputPersonnelJobTitle').trigger('input');
    $('#inputDepartmentName').trigger('input');
    $('#inputLocationName').trigger('input');

    $("#inputPersonnelFirstName").val("");
    $("#inputPersonnelLastName").val("");
    $("#inputPersonnelEmail").val("");
    $("#inputPersonnelJobTitle").val("");
    $("#inputDepartmentName").val("");
    $("#inputLocationName").val("");
}

function clearRHS() {
    $("#valuePersonnelID").val("");
    $("#valueFirstName").val("");
    $("#valueLastName").val("");
    $("#valueJobTitle").val("");
    $("#valueEmail").val("");
    $("#valueDepartment").val("");
    $("#valueLocation").val("");
    $("#valueDepartmentID").val("");
    $("#valueDepartmentName").val("");
    $("#valueLocationID").val("");
    $("#valueLocationName").val("");
}

function toggleConfirm(databaseType, requestType, id="na") {

    $("#checkboxSubmitRequest").attr("disabled", false)
    $("#checkboxSubmitRequest").attr("checked", false);
    $("#buttonAcceptConfirm").attr("disabled", true);
    $("#buttonAcceptConfirm").attr("class", "btn btn-outline-danger");
    

    let flagPrevent = false;
    let warnings = affectedPersonnel = affectedDepartments = "";
    const message = ("<span>Are you certain you want to " + requestType.toLowerCase() +  " the proposed " + databaseType + "?</span>");

    $("#headerConfirm").html("Confirm " + requestType);
    $("#modalContentDivConfirm").empty();
    
    $("#buttonAcceptConfirm").attr("onclick", "acceptRequest('" + databaseType + "', '" + requestType + "', '" + id + "');");

    if(requestType == request.DESTROY) {$("#interfaceConfirm").modal("show");}
    $("#buttonCancelCreateEdit").attr("onclick", "$('#interfaceConfirm').modal('hide');");

    switch(databaseType) {
        case database.PERSONNEL:

            if(requestType == request.CREATE || requestType == request.UPDATE) {
                modalSwapTransition("personnelCreateEditInterface", "interfaceConfirm");
                $("#buttonCancelCreateEdit").attr("onclick", "modalSwapTransition('interfaceConfirm', 'personnelCreateEditInterface');");

            } else if (requestType == request.DESTROY) {
                warnings = warnings + "<br><br><span><strong>Warning:</strong> This deletion can not be undone</span>";
                $("#modalContentDivConfirm").append(message);
                $("#modalContentDivConfirm").append(warnings);
            }

            if(requestType == request.CREATE) {
                ajaxCRUD(filenamePHP.READ_PERSONNEL).then(personnelDetails => {
                    personnelDetails["data"].forEach(element => {
                        if (
                            element["firstName"] == $("#inputPersonnelFirstName").val() &&
                            element["lastName"] == $("#inputPersonnelLastName").val() &&
                            element["email"] == $("#inputPersonnelEmail").val()                       
                        ) {
                            warnings = "<br><br><span><strong>Warning:</strong> This Personnel already exists with an identical full name and email address.</span>";
                            flagPrevent = true;
                        }
                    })
                    $("#modalContentDivConfirm").append(message);
                    $("#modalContentDivConfirm").append(warnings);
                    flagPrevent ? $("#checkboxSubmitRequest").attr("disabled", "true"): "";
                });
            } 


        break;
        case database.DEPARTMENT:

            if(requestType == request.CREATE || requestType == request.UPDATE) {
                modalSwapTransition("departmentCreateEditInterface", "interfaceConfirm");
                $("#buttonCancelCreateEdit").attr("onclick", "modalSwapTransition('interfaceConfirm', 'departmentCreateEditInterface');");
            }

            if(requestType == request.CREATE) {
                ajaxCRUD(filenamePHP.READ_DEPARTMENT).then(departmentDetails => {
                    departmentDetails["data"].forEach(element => {
                        if (element["name"] == $("#inputDepartmentName").val()) {
                            warnings = "<br><br><span><strong>Warning:</strong> Department Name already exists. Please review the pre-existing Department or consider another Department Name.</span>";
                            flagPrevent = true;
                        }
                    })
                    $("#modalContentDivConfirm").append(message);
                    $("#modalContentDivConfirm").append(warnings);
                    flagPrevent ? $("#checkboxSubmitRequest").attr("disabled", "true"): "";
                });
                

            } else if (requestType == request.UPDATE) {
                ajaxCRUD(filenamePHP.READ_PERSONNEL, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, filter.DEPARTMENT, id).then(personnelData => {
                    affectedPersonnel = personnelData['data'].length;
                    personnelData['data'].length > 0 ? warnings = warnings + "<br><br><span><strong>Warning:</strong> There are " + affectedPersonnel + " Employee instances that reference this " + databaseType + ". These will be affected." : "" + "<br><br><span>The above changes cannot be undone once accepted.</span>";
                    $("#modalContentDivConfirm").append(message);
                    $("#modalContentDivConfirm").append(warnings);
                });

            } else if(requestType == request.DESTROY) {
                ajaxCRUD(filenamePHP.READ_PERSONNEL, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, filter.DEPARTMENT, id).then(personnelData => {
                if(personnelData['data'].length > 0) {
                    affectedPersonnel = personnelData['data'].length;
                    flagPrevent = true;
                    warnings = warnings + "<br><br><span><strong>Warning:</strong> There are " + affectedPersonnel + " Employee instances that reference this " + databaseType + ".";
                    warnings = warnings + "<br><br><span>Deletion has been disabled to maintain database integrity.</span>";
                }
                $("#modalContentDivConfirm").append(message);
                $("#modalContentDivConfirm").append(warnings);
                flagPrevent ? $("#checkboxSubmitRequest").attr("disabled", "true"): "";
                });
            }

        break;

        case database.LOCATION:

            if(requestType == request.CREATE || requestType == request.UPDATE) {
                modalSwapTransition("locationCreateEditInterface", "interfaceConfirm");
                $("#buttonCancelCreateEdit").attr("onclick", "modalSwapTransition('interfaceConfirm', 'locationCreateEditInterface');");
            }

            if(requestType == request.CREATE) {
                ajaxCRUD(filenamePHP.READ_LOCATION).then(locationDetails => {
                    locationDetails["data"].forEach(element => {
                        if (element["name"] == $("#inputLocationName").val()) {
                            warnings = "<br><br><span><strong>Warning:</strong> Location Name already exists. Please review the pre-existing Location or consider another Location Name.</span>";
                            flagPrevent = true;
                        }
                    })
                    $("#modalContentDivConfirm").append(message);
                    $("#modalContentDivConfirm").append(warnings);
                    flagPrevent ? $("#checkboxSubmitRequest").attr("disabled", "true"): "";
                });
            } 

            if(requestType == request.UPDATE || requestType == request.DESTROY) {
                ajaxCRUD(filenamePHP.READ_PERSONNEL, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, filter.LOCATION, id).then(personnelData => {
                ajaxCRUD(filenamePHP.READ_DEPARTMENT, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, filter.LOCATION, id).then(departmentsData => {
                    
                    affectedPersonnel = personnelData['data'].length;
                    affectedDepartments = departmentsData['data'].length;

                    if(requestType == request.UPDATE) {
                        affectedPersonnel > 0 ? warnings = warnings + "<br><br><span><strong>Warning:</strong> There are " + affectedPersonnel + " Employee instances that reference this " + databaseType + ". These will be affected." : "";
                        affectedDepartments > 0 ? warnings = warnings + "<br><br><span><strong>Warning:</strong> There are " + affectedDepartments + " Department instances that reference this " + databaseType + ". These will be affected.": "";
                        affectedPersonnel > 0 || affectedDepartments > 0 ? warnings = warnings + "<br><br><span>The above changes cannot be undone once accepted.</span>" : "";

                    } else if (requestType == request.DESTROY) {
                        affectedPersonnel > 0 ? warnings = warnings + "<br><br><span><strong>Warning:</strong> There are " + affectedPersonnel + " Employee instances that reference this " + databaseType + ".</span>" : "";
                        affectedDepartments > 0 ? warnings = warnings + "<br><br><span><strong>Warning:</strong> There are " + affectedDepartments + " Department instances that reference this " + databaseType + ".</span>" : "";
                        
                        if(affectedPersonnel > 0 || affectedDepartments > 0) {
                            flagPrevent = true;
                            warnings = warnings + "<br><br><span>Deletion has been disabled to maintain database integrity.</span>"
                        }
                    }
                    $("#modalContentDivConfirm").append(message);
                    $("#modalContentDivConfirm").append(warnings);
                    flagPrevent ? $("#checkboxSubmitRequest").attr("disabled", "true"): "";
                });});
            }
        break;
    }
}

function populateSelectOptions(selectID, data, database, preselected = "na", placeholder = "") {
    $(selectID).empty();
    let prev = next = selected = "";
    $(selectID).append("<option id='selectPlaceholder' value='' selected disabled hidden>" + placeholder + "</option>")
    data["data"].forEach(element => {
        selected = element['name'] == preselected ? "selected" : "";
        next = element["name"];
        next != prev ? $(selectID).append("<option id='option" + database + element["id"] + "'value='" + element["id"] + "' " + selected + ">" + element["name"] + "</option>"): "";
        prev = next;
    });
    
}

function acceptRequest(databaseType, requestType, id="na") {
    let filename = firstName = lastName = jobTitle = email = departmentID = departmentName = locationID = locationName = filterDB = filterID = sortBy1 = sortBy2 = undefined;
    let refreshType = "";

    if(requestType == request.CREATE || requestType == request.UPDATE) {

        switch(databaseType) {

            case database.PERSONNEL:
                refreshType = database.PERSONNEL;
                filename = filenamePHP.CREATE_PERSONNEL;
                if(requestType == request.UPDATE) {filename = filenamePHP.UPDATE_PERSONNEL;}
                firstName = $("#inputPersonnelFirstName").val();
                lastName = $("#inputPersonnelLastName").val();
                jobTitle = $("#inputPersonnelJobTitle").val();
                email = $("#inputPersonnelEmail").val();
                departmentID = $("#selectDepartment").val();
            break;

            case database.DEPARTMENT:
                refreshType = database.DEPARTMENT;
                filename = filenamePHP.CREATE_DEPARTMENT;
                if(requestType == request.UPDATE) {filename = filenamePHP.UPDATE_DEPARTMENT; departmentID = id;}
                departmentName = $("#inputDepartmentName").val();
                locationID = $("#selectDepartmentLocation").val();
            break;

            case database.LOCATION:
                refreshType = database.LOCATION;
                filename = filenamePHP.CREATE_LOCATION;
                if(requestType == request.UPDATE) {filename = filenamePHP.UPDATE_LOCATION; locationID = id;}
                locationName = $("#inputLocationName").val();
            break;
        }

    } else if (requestType == request.DESTROY) {

        if      (databaseType == database.PERSONNEL)    {refreshType = database.PERSONNEL;  filename = filenamePHP.DESTROY_PERSONNEL;   id = id;}
        else if (databaseType == database.DEPARTMENT)   {refreshType = database.DEPARTMENT; filename = filenamePHP.DESTROY_DEPARTMENT;  departmentID = id;}
        else if (databaseType == database.LOCATION)     {refreshType = database.LOCATION;   filename = filenamePHP.DESTROY_LOCATION;    locationID = id;}

    }
    
    ajaxCRUD(filename, id, firstName, lastName, jobTitle, email, departmentID, departmentName, locationID, locationName, filterDB, filterID, sortBy1, sortBy2)
    .then(refresh(refreshType));
    $("#interfaceConfirm").modal("hide");
    scrollTop();
    clearRHS();
}   

function modalSwapTransition(hideID, showID) {
    $("#" + hideID).modal("hide");
    setTimeout(() => $("#" + showID).modal("show"), 500);
}

function returnToDataForm(requestType) {
    if(requestType === request.DESTROY) {
        $("#interfaceConfirm").modal("hide");
    } else {
        modalSwapTransition("interfaceConfirm", "interfaceCreateEdit");
    }
}

function checkboxConfirm(checkbox) {
    if(checkbox.checked) {
        $('#buttonAcceptConfirm').removeClass('btn-outline-danger')
        document.getElementById("buttonAcceptConfirm").removeAttribute("disabled")
        $('#buttonAcceptConfirm').addClass('btn-outline-success')
    } else {
        $('#buttonAcceptConfirm').removeClass('btn-outline-success')
        document.getElementById("buttonAcceptConfirm").setAttribute("disabled", "disabled");
        $('#buttonAcceptConfirm').addClass('btn-outline-danger');
    }
}

function scrollTop() {
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
    });
}

function slidePersonnel(data) {
    let list = "";
    $("#divListDataRow").empty();
    data["data"].forEach(element => list = list +
        "<div id='slidePersonnel" + element["id"] + "' class='slide col-sm-12 col-md-12 col-lg-6 col-xl-4'>" + 
            "<div class='data-slides-main'>" +
                "<div class='slide-front'>" +
                    "<div class='divBackgroundImageIcon personnelBackground'></div>" +
                    "<h3 class='slideName'>" + element["firstName"] + " " + element["lastName"] + "</h3>" +
                    "<div id='slideJob' class='slideInfo'><span>" + element["jobTitle"] + "</span></div>" +
                    "<div class='slideDepartmentLocation container containerFullWidth'><div id='slidePersonnelDepartment' class='slideInfo'><span>" + element["department"] + "</span></div><div id='slidePersonnelLocation' class='slideInfo'><span>" + element["location"] + "</span></div></div>" + 
                "</div>" +
                "<div class='slide-back'>" +
                    "<div class='slideEmail input-group mb-2' id='slideEmail'>" + 
                        "<div class='slideDivLabelEmail input-group-prepend'>" +
                            "<span class='slideSpanLabelEmail borderlessRight input-group-text' id='slideSpanLabelEmail'><i class='fas fa-envelope'></i></span>" +
                        "</div>" +
                        "<input type='text' class='slideInputEmail borderlessLeft form-control' value=' " + element["email"] + " ' disabled>" +
                    "</div>" +
                    "<div id='slideDivButtons' class='slideDivButtons btn-group' role='group' aria-label='database-buttons'>" +
                        "<button class='btn btn-outline-success' type='button' data-toggle='modal' data-target='#interfaceCreateEdit' onclick='personnelDetails(" + element["id"] + ");'><i class='far fa-eye'></i></i></button>" +
                        "<button class='btn btn-outline-primary' type='button' data-toggle='modal' data-target='#interfaceCreateEdit' onclick='editPersonnel(" + element["id"] + ");'><i class='fas fa-user-edit'></i></button>" +
                        "<button class='btn btn-outline-danger' type='button' data-toggle='modal' data-target='#interfaceCreateEdit' onclick='deletePersonnel(" + element["id"] + ");'><i class='fas fa-user-minus'></i></button>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>"
    );
    $("#divListDataRow").append(list);
}

function slideDepartment(data) {
    let list = "";
    $("#divListDataRow").empty();
    data["data"].forEach(element => list = list +
        "<div class='slide col-sm-12 col-md-12 col-lg-6 col-xl-4'>" +
            "<div class='data-slides-main'>" +
                "<div class='slide-front'>" +
                    "<div class='divBackgroundImageIcon departmentBackground'></div>" +
                    "<h3 class='slideDepartment'>" + element["name"] + "</h3>" +
                "</div>" +
                "<div class='slide-back'>" + 

                    "<div class='slideEmail input-group mb-2' id='slideEmail'>" + 
                        "<div class='slideDivLabelEmail input-group-prepend'>" +
                            "<span class='slideSpanLabelEmail borderlessRight input-group-text' id='slideSpanLabelEmail'><i class='fas fa-globe-americas'></i></span>" +
                        "</div>" +
                        "<input type='text' class='slideInputEmail borderlessLeft form-control' value=' " + element["location"] + " ' disabled>" +
                    "</div>" +

                    "<div id='slideDivButtons' class='slideDivButtons btn-group' role='group' aria-label='database-buttons'>" +
                        "<button class='btn btn-outline-success' type='button' data-toggle='modal' data-target='#interfaceCreateEdit' onclick='departmentDetails(" + element["id"] + ");'><i class='far fa-eye'></i></button>" +
                        "<button class='btn btn-outline-primary' type='button' data-toggle='modal' data-target='#interfaceCreateEdit' onclick='editDepartment(" + element["id"] + ");'><i class='fas fa-pencil-alt'></i></button>" +
                        "<button class='btn btn-outline-danger' type='button' data-toggle='modal' data-target='#interfaceCreateEdit' onclick='deleteDepartment(" + element["id"] + ");'><i class='fas fa-trash-alt'></i></button>" +
                    "</div>" + 
                "</div>" +
            "</div>" +
        "</div>"
    );
    $("#divListDataRow").append(list);
}

function slideLocation(data) {
    let list = "";
    $("#divListDataRow").empty();
    data["data"].forEach(element => list = list +
        "<div class='slide col-sm-12 col-md-12 col-lg-6 col-xl-4'>" +
            "<div class='data-slides-main'>" +
                "<div class='slide-front'>" +
                    "<div class='divBackgroundImageIcon locationBackground'></div>" +
                    "<h3 class='slideLocation'>" + element["name"] + "</h3>" +
                "</div>" +
                "<div class='slide-back'><div id='slideDivButtons' class='slideDivButtons btn-group' role='group' aria-label='database-buttons'>" +
                    "<button class='btn btn-outline-success' type='button' data-toggle='modal' data-target='#interfaceCreateEdit' onclick='locationDetails(" + element["id"] + ");'><i class='far fa-eye'></i></button>" +
                    "<button class='btn btn-outline-primary' type='button' data-toggle='modal' data-target='#interfaceCreateEdit' onclick='editLocation(" + element["id"] + ");'><i class='fas fa-pencil-alt'></i></button>" +
                    "<button class='btn btn-outline-danger' type='button' data-toggle='modal' data-target='#interfaceCreateEdit' onclick='deleteLocation(" + element["id"] + ");'><i class='fas fa-trash-alt'></i></button>" +
                "</div></div>" +
            "</div>" +
        "</div>" +
    "</div>");
    $("#divListDataRow").append(list);
}

function mobilePersonnel(data) {
    let list = digits = i = "";
    $("#mobileView").empty();
    data["data"].forEach(element => {
        i = element["id"];
        digits = digitsLen(database.PERSONNEL, i);
        list = list + (
            "<div class='accordion-item' filterTerms='" + element["firstName"] + " " + element["lastName"] + " " + element["department"] + " " + element["location"] + "'>" +
                "<h2 class='accordion-header' id=mobileView" + i + "'>" +
                "<button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapse" + i + "' aria-expanded='false' aria-controls='collapse" + i + "'><span class='accordianSpan'>" +
                    digits + " " + element["firstName"] + " " + element["lastName"] +
                "</button>" +
                "</span></h2>" +
                "<div id='collapse" + i + "' class='accordion-collapse collapse' aria-labelledby='heading" + i + "' data-bs-parent='#mobileView'>" +
                    "<div class='accordion-body'>" +

                        "<div class='input-group mb-3' id='groupID'>" +
                        "<div class='input-group-prepend'>" +
                        "<span class='input-group-text' id='mobilePersonnelEmailLabel'><i class='mobileIcon fas fa-envelope'></i></span>" +
                        "</div>" +
                            "<input type='text' class='form-control' id='mobilePersonnelEmailValue' disabled value='" + element["email"] + "'>" +
                        "</div>" +

                        "<div class='input-group mb-3' id='groupID'>" +
                        "<div class='input-group-prepend'>" +
                        "<span class='input-group-text' id='mobilePersonnelJobTitleLabel'><i class='mobileIcon fas fa-briefcase'></i></span>" +
                        "</div>" +
                            "<input type='text' class='form-control' id='mobilePersonnelJobTitleValue' disabled value='" + element["jobTitle"] + "'>" +
                        "</div>" +

                        "<div class='input-group mb-3' id='groupID'>" +
                        "<div class='input-group-prepend'>" +
                        "<span class='input-group-text' id='mobilePersonnelDepartmentLabel'><i class='mobileIcon fas fa-building'></i></span>" +
                        "</div>" +
                            "<input type='text' class='form-control' id='mobilePersonnelDepartmentValue' disabled value='" + element["department"] + "'>" +
                        "</div>" +

                        "<div class='input-group mb-3' id='groupID'>" +
                        "<div class='input-group-prepend'>" +
                        "<span class='input-group-text' id='mobilePersonnelLocationLabel'><i class='mobileIcon fas fa-globe-americas'></i></span>" +
                        "</div>" +
                            "<input type='text' class='form-control' id='mobilePersonnelLocationValue' disabled value='" + element["location"]  + "'>" +
                        "</div>" +

                        "<div id='mobileDivButtonsEditDelete' class='container containerFullWidth btn-group' role='group' aria-label='create-edit-buttons'>" +
                            "<button class='btn btn-outline-primary' type='button' data-toggle='modal' data-target='#interfaceCreateEdit' onclick='editPersonnel(" + element["id"] + ");'><i class='fas fa-pencil-alt'></i><span> Edit</span></button>" +
                            "<button class='btn btn-outline-danger' type='button' data-toggle='modal' data-target='#interfaceCreateEdit' onclick='deletePersonnel(" + element["id"] + ");'><i class='fas fa-trash-alt'></i><span> Delete</span></button>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>"
        );
    });
    $("#mobileView").append(list);
}

function mobileDepartment(data) {
    let list = i = "";
    $("#mobileView").empty();
    data["data"].forEach(element => {
        i = element["id"];
        digits = digitsLen(database.DEPARTMENT, i);
        list = list + (
            "<div class='accordion-item' filterTerms='" + element["name"] + " " + element["location"] + "'>" +
                "<h2 class='accordion-header' id=mobileView" + i + "'>" +
                "<button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapse" + i + "' aria-expanded='false' aria-controls='collapse" + i + "'><span class='accordianSpan'>" +
                    digits + " " + element["name"] +
                "</span></button>" +
                "</h2>" +
                "<div id='collapse" + i + "' class='accordion-collapse collapse' aria-labelledby='heading" + i + "' data-bs-parent='#mobileView'>" +
                    "<div class='accordion-body'>" +

                        "<div class='input-group mb-3' id='groupID'>" +
                        "<div class='input-group-prepend'>" +
                        "<span class='input-group-text' id='mobileDepartmentLocationLabel'><i class='mobileIcon fas fa-globe-americas'></i></span>" +
                        "</div>" +
                            "<input type='text' class='form-control mobileDepartmentLocationValue' disabled value='" + element["location"]  + "'>" +
                        "</div>" +

                        "<div class='input-group'>" +
                        "<div class='input-group-prepend'>" +
                            "<span class='input-group-text'><i class='fas fa-user'></i></span>" +
                        "</div>" +
                            "<textarea id='mobileDepartmentPersonnel" + i + "' class='mobileDepartmentPersonnel form-control' aria-label='With textarea' disabled></textarea>" +
                        "</div><br>" +

                        "<div id='mobileDivButtonsEditDelete' class='container containerFullWidth btn-group' role='group' aria-label='create-edit-buttons'>" +
                            "<button class='btn btn-outline-primary' type='button' onclick='editDepartment(" + element["id"] + ");'><i class='fas fa-pencil-alt'></i><span> Edit</span></button>" +
                            "<button class='btn btn-outline-danger' type='button' onclick='deleteDepartment(" + element["id"] + ");'><i class='fas fa-trash-alt'></i><span> Delete</span></button>" +
                        "</div>" +

                    "</div>" +
                "</div>" +
            "</div>"
        );
        
    });
    $("#mobileView").append(list);
    for(let j = 1; j <= data["data"].length; j++) {linkedItems(j, database.PERSONNEL, filenamePHP.READ_PERSONNEL, filter.DEPARTMENT, "lastName", "mobileDepartmentPersonnel");}
}

function mobileLocation(data) {
    let list = digits = i = "";
    $("#mobileView").empty();
    data["data"].forEach(element => {
        i = element["id"];
        digits = digitsLen(database.LOCATION, i);
        list = list + (
            "<div class='accordion-item' filterTerms='" + element["name"] + ">" +
                "<h2 class='accordion-header' id=mobileView" + i + "'>" +
                "<button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapse" + i + "' aria-expanded='false' aria-controls='collapse" + i + "'><span class='accordianSpan'>" +
                    digits + " " + element["name"] +
                "</span></button>" +
                "</h2>" +
                "<div id='collapse" + i + "' class='accordion-collapse collapse' aria-labelledby='heading" + i + "' data-bs-parent='#mobileView'>" +
                    "<div class='accordion-body'>" +

                        "<div class='input-group'>" +
                        "<div class='input-group-prepend'>" +
                            "<span class='input-group-text'><i class='fas fa-building'></i></span>" +
                        "</div>" +
                            "<textarea id='mobileLocationDepartments" + i + "' class='mobileLocationDepartments form-control' aria-label='With textarea' disabled></textarea>" +
                        "</div><br>" +

                        "<div class='input-group'>" +
                        "<div class='input-group-prepend'>" +
                            "<span class='input-group-text'><i class='fas fa-user'></i></span>" +
                        "</div>" +
                            "<textarea id='mobileLocationPersonnel" + i + "' class='mobileLocationPersonnel form-control' aria-label='With textarea' disabled></textarea>" +
                        "</div><br>" +

                        "<div id='mobileDivButtonsEditDelete' class='container containerFullWidth btn-group' role='group' aria-label='create-edit-buttons'>" +
                            "<button class='btn btn-outline-primary' type='button' onclick='editDepartment(" + element["id"] + ");'><i class='fas fa-pencil-alt'></i><span> Edit</span></button>" +
                            "<button class='btn btn-outline-danger' type='button' onclick='deleteDepartment(" + element["id"] + ");'><i class='fas fa-trash-alt'></i><span> Delete</span></button>" +
                        "</div>" +

                    "</div>" +
                "</div>" +
            "</div>"
        );
    });
    $("#mobileView").append(list);
    for(let j = 1; j <= data["data"].length; j++) {linkedItems(j, database.DEPARTMENT, filenamePHP.READ_DEPARTMENT, filter.LOCATION, "name", "mobileLocationDepartments");}
    for(let j = 1; j <= data["data"].length; j++) {linkedItems(j, database.PERSONNEL, filenamePHP.READ_PERSONNEL, filter.LOCATION,  "lastName", "mobileLocationPersonnel");}
}

function linkedItems(id, databaseType, filename, filterType, orderOn, htmlID) {
    let list = label = "";
    let i = 0;
    ajaxCRUD(filename, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, filterType, id, orderOn).then(data => {
        data["data"].forEach(element => {
            list = list + digitsLen(databaseType, element["id"]) + " " + (databaseType == database.PERSONNEL ? element["firstName"] + " " + element["lastName"] : element["name"]) + "\n";
            i = i + 1;
        })
        $("#" + htmlID + id).val(list)
        $("#" + htmlID + id).height(i*24);
    });

}

$('.buttonDB').click(function(e) {
    e.preventDefault();
    $("#buttonEmployeeDB").attr("class", "buttonDB btn btn-secondary");
    $("#buttonDepartmentsDB").attr("class", "buttonDB btn btn-secondary");
    $("#buttonLocationsDB").attr("class", "buttonDB btn btn-secondary");
    $(this).addClass('buttonDBChecked');
});

function modalButtons() {
    $("#cancelCreateEditPersonnel").attr("onclick", "$('#personnelCreateEditInterface').modal('hide');");
    $("#cancelCreateEditDepartment").attr("onclick", "$('#departmentCreateEditInterface').modal('hide');");
    $("#cancelCreateEditLocation").attr("onclick", "$('#locationCreateEditInterface').modal('hide');");
}

jQuery('form[data-toggle="validator"] select').on('change', function(event) {
    event.preventDefault();
    jQuery(this).find('option[disabled]').remove();
});

$("form").submit(function(e) {
    e.preventDefault();
});