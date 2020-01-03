<?  
class Program extends CI_Controller {       // program클래스 선언
    function __construct(){                           // 클래스생성할 때 초기설정
        parent::__construct();
        $this->load->database();                     // 데이터베이스 연결
        $this->load->model("program_m");    // 모델 program_m 연결
        $this->load->helper(array("url","date"));
        $this->load->library('pagination');
        $this->load->library('upload');
        $this->load->library('image_lib');
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
        $data["row"]=$this->program_m->getrow($no);
        
        $this->load->view("main_header");
        //$this->load->view("program_title");                  
        $this->load->view("program_view",$data);
        $this->load->view("main_footer");                      
    }
    public function lists(){
        $uri_array=$this->uri->uri_to_assoc(3);
        $text1 = array_key_exists("text1",$uri_array) ? urldecode($uri_array["text1"]) : "" ;

        if($text1==""){
            $base_url = "/program/lists/page";
        }
        else{
            $base_url = "/program/lists/text1/$text1/page"; 
        }
        
        $page_segment = substr_count(substr($base_url,0,strpos($base_url,"page")) , "/" )+1;
        $base_url = "/~sale8" .$base_url;

        $config["per_page"]	 = 5;                              // 페이지당 표시할 line 수
        $config["total_rows"] = $this->program_m->rowcount($text1);  // 전체 레코드개수 구하기
        $config["uri_segment"] = $page_segment;		 // 페이지가 있는 segment 위치
        $config["base_url"]	 = $base_url;                // 기본 URL
        
        $this->pagination->initialize($config);           // pagination 설정 적용

        $data["page"]=$this->uri->segment($page_segment,0);  // 시작위치, 없으면 0.
        $data["pagination"] = $this->pagination->create_links();  // 페이지소스 생성

        $start=$data["page"];                 // n페이지 : 시작위치
        $limit=$config["per_page"];        // 페이지 당 라인수
       
        $data["text1"]=$text1;
        $data["list"]=$this->program_m->getlist($text1,$start,$limit);
    
        $this->load->view("main_header");                    // 상단출력(메뉴)
        $this->load->view("program_list",$data);           // program_list에 자료전달
        $this->load->view("main_footer");                      // 하단 출력 
    }
    public function del(){
        $uri_array=$this->uri->uri_to_assoc(3);
        $no	= array_key_exists("no",$uri_array) ? $uri_array["no"] : "" ;
        $text1 = array_key_exists("text1",$uri_array) ? "/text1/" . urldecode($uri_array["text1"]) : "" ;
        $page = array_key_exists("page",$uri_array) ? "/page/" . urldecode($uri_array["page"]) : 0;

        $this->program_m->deleterow($no);

        redirect("/~sale8/program/lists" . $text1 .$page);             // 목록화면으로 돌아가기
    }
    public function add(){
        $uri_array=$this->uri->uri_to_assoc(3);
        $text1 = array_key_exists("text1",$uri_array) ? "/text1/" . urldecode($uri_array["text1"]) : "" ;
        $page = array_key_exists("page",$uri_array) ? "/page/" . urldecode($uri_array["page"]) : "";

        $this->load->library("form_validation");
        
        $this->form_validation->set_rules("program","프로그램명","required");
        $this->form_validation->set_rules("name","관리자","required|max_length[50]");
        $this->form_validation->set_rules("price","번호","required|numeric");

        if($this->form_validation->run()==FALSE){      //추가버튼 클릭시 
            $data["list"]  = $this->program_m->getlist_gubun();
            $this->load->view("main_header");          // 상단출력(메뉴)
            $this->load->view("program_add", $data);           // program_list에 자료전달
            $this->load->view("main_footer");  
        }
        else{
            $data = array(
                'gubun_no8' => $this->input->post("gubun_no",TRUE),
                'name8' => $this->input->post("name",TRUE),
                'price8' => $this->input->post("price",TRUE),
                'jaego8' => $this->input->post("jaego",TRUE),
            );
            $picname = $this->call_upload();
            if($picname) $data["pic8"] = $picname;

            $result = $this->program_m->insertrow($data);         //데이터 저장
            redirect("/~sale8/program/lists" .$text1 .$page); 
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
            $data["list"] = $this->program_m->getlist_gubun();

            $this->load->view('main_header');          // 상단출력(메뉴)
            $data["row"]=$this->program_m->getrow($no);
            $this->load->view("program_edit",$data);
            $this->load->view('main_footer');  
        }
        else{
          $data = array(
            'gubun_no8' => $this->input->post("gubun_no",TRUE),
            'name8' => $this->input->post("name",TRUE),
            'price8' => $this->input->post("price",TRUE),
            'jaego8' => $this->input->post("jaego",TRUE),
          );
          $picname = $this->call_upload();
          if($picname) $data["pic"] = $picname;

          $result = $this->program_m->updaterow($data, $no); //185p, 원래는 $data, $no 넣는거였음
          redirect("/~sale8/program/lists" .$text1 .$page); 
        }
    }
    public function call_upload(){
        $config['upload_path']	= './program_img/';
        $config['allowed_types']	= 'gif|jpg|png'; 
        $config['overwrite']	= TRUE; 
        $config['max_size']	= 10000000;
        $config['max_width']	= 10000;
        $config['max_height']	= 10000;
        
        $this->upload->initialize($config); 
        if (!$this->upload->do_upload('pic')) 
            $picname="";
        else{
            $picname=$this->upload->data("file_name");

            $config['image_library'] = 'gd2';
            $config['source_image'] = './program_img/' . $picname;
            $config['thumb_marker'] = '';
            $config['new_image'] = './picture_img/thumb';
            $config['create_thumb'] = TRUE;
            $config['maintain_ratio'] = TRUE;
            $config['width'] = 200;
            $config['height'] =  150;

            $this->image_lib->initialize($config);
            $this->image_lib->resize();
        }    
        return $picname;
    }

    public function jaego() {
        $uri_array=$this->uri->uri_to_assoc(3);
        $text1 = array_key_exists("text1",$uri_array) ? "/text1/".urldecode($uri_array["text1"]) : "" ;
        $page = array_key_exists("page",$uri_array) ? "/page/" . urldecode($uri_array["page"]) : 0;

        

        $data["text1"]=$text1;
        $data["page"]=$page;
        
        $result = $this->program_m->cal_jaego($data);
        redirect("/~sale8/program/lists" .$text1 .$page); //action 대신에 실행해줌
    }

}
?>
