<?php
    namespace app\organization\controller;

    use app\organization\model\Assess;
    use think\Controller;
    use think\Request;

    
    class Assessors extends Controller{

        public function All(){
            $data=Assess::all();
            return json($data);
        }

        public function saveComment(){
           try {
                $assessid=$_POST['assessid'];
                @$grade=$_POST['grade'];
                @$comment=$_POST['comment'];
                @$status=$_POST['status'];
                
                $assess=Assess::get($assessid);
                if($grade){
                    $assess->grade = $grade;
                }
                if($comment){
                    $assess->comment = $comment;
                }
                if($status=="已评估"){
                    $assess->status = $status;
                }
                $assess->save();
                return 'success';
           } catch (\Throwable $th) {
               return 'false';
           }
        }




        //下载待翻译文件
        public function download(){
            $assessId=$_POST['assessid'];
            $assess=assess::get($assessId);
            //获取存储路径
            $infopath=$assess->infopath;
            $name=$assess->name;
            //获取后缀名
            $extensionName=substr(strrchr($infopath, '.'), 1);
            //拼接文件名
            $filename=$name.'-'.date('mdHis').'.'.$extensionName;
            //拼接完整下载路径
            $infopath='.'.DS.'uploads'.DS.'info'.DS.$infopath;
             //检查文件是否存在
            if (! file_exists($infopath) ) {
                return 'false';
            }else{
                // 打开文件
                $file1 = fopen($infopath, "r");
                // 输入文件标签
                Header("Content-type: application/octet-stream");
                Header("Accept-Ranges: bytes");
                Header("Accept-Length:".filesize($infopath));
                Header("Content-Disposition: attachment;filename=" . $filename);
                ob_clean();     // 重点！！！
                flush();        // 重点！！！！可以清除文件中多余的路径名以及解决乱码的问题：
                //输出文件内容
                //读取文件内容并直接输出到浏览器
                echo fread($file1, filesize($infopath));
                fclose($file1);
                exit();
                return 'success';
            }
        }

    }