$(document).ready(function(){
     showMenu();
     showSubMenu();
     showTeams();
});
// ISPISIVANJE I PRIKAZIVANJE MENIJA
function ajaxMenu(){
    $.ajax({
        url: "data/categories.json",
        method: "GET",
        success: function(menu){
          printMenu(menu);
        }
    })
}
function showMenu() {
    ajaxMenu(function(menu){
            printMenu(menu);
        });
}
function printMenu(menu){
  let ispis = "<ul>";
  menu.forEach(menu => {
    if(document.URL.indexOf(menu.href) != -1){
    ispis += `<li><a href="#${menu.href}" class="aktivan" data-kategorijeID="${menu.id}">${menu.naziv}</a></li>`;
  }else{
    ispis += `<li><a href="#${menu.href}" data-kategorijeID="${menu.id}">${menu.naziv}</a></li>`;
  }
  });
  ispis += "</ul>";
  document.getElementById("tgLige").innerHTML = ispis;
  $("#tgLige ul li a").click(filtPoKategoriji);
}
// PROKAZIVANJE I ISPISIVANJE PODMENIJA
function ajaxSubMenu(callbackSuccess){
    $.ajax({
        url: "data/asideMenu.json",
        method: "GET",
        success: callbackSuccess
    });
}
function showSubMenu() {
    ajaxSubMenu(function(subMenu){
            printSubMenu(subMenu);
        });
}
function printSubMenu(subMenu){
  let ispis = "<ul>";
  var data = JSON.parse('{}');
  subMenu.slice(0, 11).forEach(subMenu => {
    // console.log(subMenu);
    obradaAktivan();
    if(document.URL.indexOf(subMenu.href) != -1){
       ispis += `<li><a data-aMeniId="${subMenu.id}" href="#${subMenu.href}" class="navbar-item aktivan">${subMenu.naziv}</a></li>`;
      }
       else {
         ispis += `<li><a data-aMeniId="${subMenu.id}" href="#${subMenu.href}" class="navbar-item">${subMenu.naziv}</a></li>`;
      }
  });
  ispis += "</ul>";
  document.getElementById("navigacijaTimova").innerHTML = ispis;
  $('#navigacijaTimova ul li a.navbar-item.aktivan').removeClass("aktivan");// brise klsau aktivan nakon promene menia
}
// ISPISIVANJE I PRIKAZIVANJE TIMOVA
function ajaxTeams(callbackSuccess){
    $.ajax({
        url: "data/teams.json",
        method: "GET",
        success: callbackSuccess
    });
}
function showTeams() {
    ajaxTeams(function(teams){
            printTeams(teams);
        });

}
function printTeams(teams){
  let ispis = "";
    teams.slice(0, 11).forEach(team => {
        ispis += `<article data-idTeam="${team.page}" id="${team.page}" class="container"><div class="team">
          <img class="team-logo" src="${team.slika}"/>
          <div class="team-info">
            <h3>${team.kategorija.naziv}</h3>
            <h2 id="${team.boja}" data-idKorisnik="${team.id}">${team.title}</h2>
            <h5>${team.opis}</h5>
            <p>${team.text}</p>
            <div class="team-social">
              <a href="${team.social.siteLink}" target="_blank">
                <i class="fas fa-globe-americas"></i>
              </a>
              <a href="${team.social.twitter}" target="_blank">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="${team.social.instagram}" target="_blank">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div></article>`
    });
    document.getElementById("timovi").innerHTML = ispis;
}
// obrada aktivan
function obradaAktivan(){
  $(document).ready(function() {
  $('#navigacijaTimova ul a[href^="#"]').bind('click', function(e) {
      e.preventDefault();
      var target = $(this).attr("href");
      $('html, body').stop().animate({
          scrollTop: $(target).offset().top
      }, 600, function() {
          location.hash = target;
          $('#timovi').addClass('poravnaj');
      });
   $('#timovi').removeClass('poravnaj');
      return false;
  });
 });
}
// filtriranje kategorija za asideMenu i teams
function filtPoKategoriji(e){
  e.preventDefault();
  const idCategory = this.dataset.kategorijeid;
   // menu > submenu filt
  ajaxSubMenu(function(subMenu){
    subMenu = filterCategory(subMenu, idCategory);
    printSubMenu(subMenu);
  });
   //menu > team filt
  ajaxTeams(function(teams){
    teams = filterCategoryTeams(teams, idCategory);
    printTeams(teams);
  });
 }
  // menu > submenu filt
function filterCategory(teams, idCategory){
  return teams.filter(x => x.id == idCategory);
}
//menu > team filt
function filterCategoryTeams(teams, idCategory){
  return teams.filter(x => x.kategorija.idKategorija == idCategory);
}
