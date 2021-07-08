<?php
/*
Author: Beaver Coffee
Author URI: https://beaver.coffee
Description: Prevent Contact Form 7 accidental or multiple submissions.
Domain Path:
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Network: true
Plugin Name: BC CF7 Submit
Plugin URI: https://github.com/beavercoffee/bc-cf7-submit
Requires at least: 5.7
Requires PHP: 5.6
Text Domain: bc-cf7-submit
Version: 1.7.8
*/

if(defined('ABSPATH')){
    require_once(plugin_dir_path(__FILE__) . 'classes/class-bc-cf7-submit.php');
    BC_CF7_Submit::get_instance(__FILE__);
}
