<?php
    namespace app\organization\controller;

    use app\organization\model\Assess;
    use app\organization\model\School;
    use think\Controller;
    use think\Request;

    
    class Recommend extends Controller{

        //查找需要推荐院校的学生信息
        public function selectNeed(){
            $data=Assess::where('needrecommend','like','%推荐')->where('status','已评估')->select();
            return json($data);
        }

        public function school(){
            $data=School::all();
            return json($data);
        }

        public function recommend(){
            $assessId=$_POST['assessid'];
            try {
                Assess::where('assessid',$assessId)->update(['needrecommend'=>'已推荐']);
                return 'success';
            } catch (\Throwable $th) {
                return 'false';                
            }
        }

        public function addSchool(){
            try {
                $assessId=$_POST['assessid'];
                $first=$_POST['first'];
                $second=$_POST['second'];

                $assess=Assess::get($assessId);
                if($first!=""){
                    $assess->first=$first;
                }
                if($second!=""){
                    $assess->second=$second;
                }
                $assess->save();
                return 'success';
            } catch (\Throwable $th) {
                return 'false';
            }
        }
    }