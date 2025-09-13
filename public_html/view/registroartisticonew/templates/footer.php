  <!-- comum -->
  <?php echo '<script src="'.$config["assets"].'js/core/request.js?v=1"></script>'?>           
  <?php echo '<script src="'.$config["assets"].'js/core/functions.js?v=1"></script>'?>           
  <?php echo '<script src="'.$config["assets"].'js/core/public.js?v=1"></script>'?>  
  
  <!-- vendor -->             
  <?php echo '<script src="'.$config["assets"].'vendor/jsdelivr/min.js?v=1"></script>'?>           
  <?php echo '<script src="'.$config["assets"].'vendor/jquery/min.js?v=1"></script>'?>           
  <?php echo '<script src="'.$config["assets"].'vendor/jsbootstrap/bootstrap.min.js?v=1"></script>'?>  

  <!-- configuração -->
  <?php echo '<script> localStorage.setItem("title", "'.$config["title"].'") </script>'?>
  <?php echo '<script> localStorage.setItem("team", "'.$config["team"].'") </script>'?>
  <?php echo '<script> localStorage.setItem("source", "'.$config["source"].'") </script>'?>      
  <?php echo '<script> localStorage.setItem("api", "'.$config["api"].'") </script>'?>  
  <?php echo '<script> localStorage.setItem("assets", "'.$config["assets"].'") </script>'?> 

  <script>
    document.addEventListener("DOMContentLoaded", function() 
    {
        localStorage.setItem("form_active", document.getElementById('central'));     
        centralActive();
    });
  </script>
