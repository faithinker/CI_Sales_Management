<?  
class Ajax extends CI_Controller {       // ajax클래스 선언
    function __construct(){                           // 클래스생성할 때 초기설정
        parent::__construct();
        $this->load->database();                     // 데이터베이스 연결
        $this->load->model("ajax_m");    // 모델 ajax_m 연결
        $this->load->helper(array("url","date"));
        $this->load->library('pagination');
    }
    public function index(){                            // 제일 먼저 실행되는 함수
        $this->lists();                                        // list 함수 호출
    }
    public function view(){
        $uri_array=$this->uri->uri_to_assoc(3);
        $no	= array_key_exists("no",$uri_array) ? $uri_array["no"] : "" ;
        $text1 = array_key_exists("text1",$uri_array) ? urldecode($uri_array["text1"]) : "" ;
        $page = array_key_exists("page",$uri_array) ? urldecode($uri_array["page"]) : 0;
        
        $data["text1"]=$text1;
        $data["page"]=$page;
        $data["row"]=$this->ajax_m->getrow($no);
        
        $this->load->view("main_header");
        //$this->load->view("ajax_title");                  
        $this->load->view("ajax_view",$data);
        $this->load->view("main_footer");                      
    }
    public function lists(){
        $uri_array=$this->uri->uri_to_assoc(3);
        $text1 = array_key_exists("text1",$uri_array) ? urldecode($uri_array["text1"]) : "" ;

        if($text1==""){
            $base_url = "/ajax/lists/page";
        }
        else{
            $base_url = "/ajax/lists/text1/$text1/page"; 
        }
        
        $page_segment = substr_count(substr($base_url,0,strpos($base_url,"page")) , "/" )+1;
        $base_url = "/~sale8" .$base_url;

        $config["per_page"]	 = 5;                              // 페이지당 표시할 line 수
        $config["total_rows"] = $this->ajax_m->rowcount($text1);  // 전체 레코드개수 구하기
        $config["uri_segment"] = $page_segment;		 // 페이지가 있는 segment 위치
        $config["base_url"]	 = $base_url;                // 기본 URL
        
        $this->pagination->initialize($config);           // pagination 설정 적용

        $data["page"]=$this->uri->segment($page_segment,0);  // 시작위치, 없으면 0.
        $data["pagination"] = $this->pagination->create_links();  // 페이지소스 생성

        $start=$data["page"];                 // n페이지 : 시작위치
        $limit=$config["per_page"];        // 페이지 당 라인수
       
        $data["text1"]=$text1;
        $data["list"]=$this->ajax_m->getlist($text1,$start,$limit);
    
        $this->load->view("main_header");                    // 상단출력(메뉴)
        $this->load->view("ajax_list",$data);           // ajax_list에 자료전달
        $this->load->view("main_footer");                      // 하단 출력 
    }
    public function del(){
        $uri_array=$this->uri->uri_to_assoc(3);
        $no	= array_key_exists("no",$uri_array) ? $uri_array["no"] : "" ;
        $text1 = array_key_exists("text1",$uri_array) ? "/text1/" . urldecode($uri_array["text1"]) : "" ;
        $page = array_key_exists("page",$uri_array) ? "/page/" . urldecode($uri_array["page"]) : 0;

        $this->ajax_m->deleterow($no);

        redirect("/~sale8/ajax/lists" . $text1 .$page);             // 목록화면으로 돌아가기
    }
    public function add(){
        $uri_array=$this->uri->uri_to_assoc(3);
        $text1 = array_key_exists("text1",$uri_array) ? "/text1/" . urldecode($uri_array["text1"]) : "" ;
        $page = array_key_exists("page",$uri_array) ? "/page/" . urldecode($uri_array["page"]) : 0;

        $this->load->library("form_validation");
        
        $this->form_validation->set_rules("name","이름","required|max_length[20]");

        if($this->form_validation->run()==FALSE){      //추가버튼 클릭시 
            $this->load->view("main_header");          // 상단출력(메뉴)
            $this->load->view("ajax_add");           // ajax_list에 자료전달
            $this->load->view("main_footer");  
        }
        else{
            $data = array(
                'name8' => $this->input->post("name",TRUE),
            );
            $result = $this->ajax_m->insertrow($data);         //데이터 저장
            redirect("/~sale8/ajax/lists" .$text1 .$page); 
        }
    }
    public function edit(){
        $uri_array=$this->uri->uri_to_assoc(3);
        $no	= array_key_exists("no",$uri_array) ? $uri_array["no"] : "" ;
        $text1 = array_key_exists("text1",$uri_array) ? "/text1/" . urldecode($uri_array["text1"]) : "" ;
        $page = array_key_exists("page",$uri_array) ? "/page/" . urldecode($uri_array["page"]) : 0;

        $this->load->library("form_validation");
        
        // $this->form_validation->set_rules("name","이름","required | max_length[20]");
        // $this->form_validation->set_rules("uid","아이디","required | max_length[20]");
        // $this->form_validation->set_rules("pwd","암호","required | max_length[20]");

        if(!$_POST){      //수정버튼 클릭시 
            $this->load->view('main_header');          // 상단출력(메뉴)

            $data["row"]=$this->ajax_m->getrow($no);
            $this->load->view("ajax_edit",$data);
            $this->load->view('main_footer');  
        }
        else{
            $data = array(
                'name8' => $this->input->post("name8",TRUE),
            );
            $result = $this->ajax_m->updaterow($data, $no); //185p, 원래는 $data, $no 넣는거였음
            redirect("/~sale8/ajax/lists" .$text1 .$page); 
        }
    }
    public function ajax_insert(){
      $name=$this->input->post ("name8", TRUE);
      $data = array(
        "name8" => $name
      );
      $this->ajax_m->insertrow($data);

      $no=$this->db->insert_id();
      if ($no) echo $no;
    }
    public function ajax_delete(){
      $no = $this->input->post("no8",TRUE);
      $result = $this->ajax_m->deleterow($no);

      if ($result) echo $no;    //ajax return
    }
}
?>
