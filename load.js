$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  })

  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });



$('#search-form').on('submit', function (ev) {
    ev.preventDefault();
    console.log("i'm in");
    var formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        type:'GET',
        url: '/ajax/endpoint/',
        data: formData,
        dataType: 'json',
        success: function (data) {
            $(document).ready(function () {
                console.log(data);
                var twitterDiv = document.getElementById('tweets');
                if (data && data.length==0) {
                    console.log("Status failed");
                    twitterDiv.innerHTML("Sorry, please try again.");
                } else {
                  console.log(data);
                  twitterDiv.innerHTML = "";
                  for(var i=0;i<data.length;i++){
                    console.log(data[i].text);
                    if(data[i].text !== ""){
                      var thisDiv = document.createElement('div');
                      thisDiv.className = "row";
                      thisDiv.id = "tweet_"+ data[i].id;
                      var innerLeft = document.createElement('div');
                      var innerRight = document.createElement('div');
                      innerLeft.className = "row-left";
                      innerRight.className = "row-right";
                      innerLeft.innerHTML = data[i].text;
                      var anchorBtn = document.createElement('a');
                      anchorBtn.href = data[i].redirectUrl;
                      anchorBtn.target = "_blank";
                      anchorBtn.className = "btn btn-custom";
                      anchorBtn.innerHTML = "Respond";
                      innerRight.appendChild(anchorBtn);
                      thisDiv.appendChild(innerLeft);
                      thisDiv.appendChild(innerRight);
                      twitterDiv.appendChild(thisDiv);
                    }
                  }
                }
            })
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        }

    });
});

});