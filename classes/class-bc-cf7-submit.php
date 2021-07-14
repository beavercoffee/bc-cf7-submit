<?php

if(!class_exists('BC_CF7_Submit')){
    final class BC_CF7_Submit {

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    	//
    	// private static
    	//
    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        private static $instance = null;

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    	//
    	// public static
    	//
    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        public static function get_instance($file = ''){
            if(null !== self::$instance){
                return self::$instance;
            }
            if('' === $file){
                wp_die(__('File doesn&#8217;t exist?'));
            }
            if(!is_file($file)){
                wp_die(sprintf(__('File &#8220;%s&#8221; doesn&#8217;t exist?'), $file));
            }
            self::$instance = new self($file);
            return self::$instance;
    	}

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    	//
    	// private
    	//
    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        private $file = '';

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    	private function __clone(){}

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    	private function __construct($file = ''){
            $this->file = $file;
            add_action('plugins_loaded', [$this, 'plugins_loaded']);
        }

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    	//
    	// public
    	//
    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        public function plugins_loaded(){
            if(!defined('BC_FUNCTIONS')){
        		return;
        	}
            if(!defined('WPCF7_VERSION')){
        		return;
        	}
            add_action('wpcf7_enqueue_scripts', [$this, 'wpcf7_enqueue_scripts']);
            add_filter('wpcf7_feedback_response', [$this, 'wpcf7_feedback_response'], 10, 2);
            add_filter('wpcf7_form_hidden_fields', [$this, 'wpcf7_form_hidden_fields']);
            bc_build_update_checker('https://github.com/beavercoffee/bc-cf7-submit', $this->file, 'bc-cf7-submit');
        }

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        public function wpcf7_enqueue_scripts(){
            $src = plugin_dir_url($this->file) . 'assets/bc-cf7-submit.css';
            $ver = filemtime(plugin_dir_path($this->file) . 'assets/bc-cf7-submit.css');
            wp_enqueue_style('bc-cf7-submit', $src, [], $ver); // don't rely on wpcf7_enqueue_styles
            $src = plugin_dir_url($this->file) . 'assets/bc-cf7-submit.js';
            $ver = filemtime(plugin_dir_path($this->file) . 'assets/bc-cf7-submit.js');
            wp_enqueue_script('bc-cf7-submit', $src, ['contact-form-7'], $ver, true);
            wp_add_inline_script('bc-cf7-submit', 'bc_cf7_submit.init();');
        }

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        public function wpcf7_feedback_response($response, $result){
            if('mail_sent' === $response['status']){
                $response['bc_loading'] = __('Loading&hellip;');
            } else {
                $response['bc_loading'] = '';
            }
            if(in_array($response['status'], ['acceptance_missing', 'init', 'spam', 'validation_failed'])){
                $response['bc_uniqid'] = '';
            } else {
                $response['bc_uniqid'] = uniqid();
            }
            return $response;
        }

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        public function wpcf7_form_hidden_fields($hidden_fields){
            $hidden_fields['bc_referer'] = isset($_GET['bc_referer']) ? wpcf7_sanitize_query_var($_GET['bc_referer']) : '';
            $hidden_fields['bc_uniqid'] = uniqid();
            return $hidden_fields;
        }

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    }
}
