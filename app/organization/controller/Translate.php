<?php
    namespace app\organization\controller;

    use app\organization\model\Article;
    use think\Controller;
    use think\Request;

    class Translate extends Controller{
        
        public function selectAuthor($author){
            $data=Article::where('author',$author)->select();
            return json($data);
        }


        public function All(){
            $data=Article::all();
            return json($data);
        }

        public function finish(){
            $articleId=$_POST['articleid'];
            try {
                Article::where('articleid',$articleId)->update(['status'=>'完成']);
                return 'success';
            } catch (\Throwable $th) {
                return 'false';                
            }
        }

        public function deleteOne($articleId){
            try {
                Article::destroy($articleId);
                return 'success';
            } catch (\Throwable $th) {
                return 'false';
            }
        }

        //上传已经翻译完的文件
        public function upload(){
            
            // 获取表单上传文件
            $file = request()->file('file');
            $articleId=$_POST['articleid'];
            // 移动到框架应用根目录/public/uploads/finished 目录下
            if($file){
                $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads' . DS . 'finished');//???
                if($info){
                    $time=date('Y-m-d H:i:s');
                    $article=Article::get($articleId);
                    $article->finishpath=$info->getSaveName();//???
                    $article->finishtime=$time;//???
                    $article->save();
                    return json($time);
                }else{
                    // 上传失败获取错误信息
                    echo $file->getError();
                    return 'false';
                }
            }
        }

        //下载待翻译文件
        public function download(){
            $articleId=$_POST['articleid'];
           // $articleId=2;
            $article=Article::get($articleId);
            //获取存储路径
            $filepath=$article->filepath;//
            $author=$article->author;
            //获取文章类型
            $type=$article->type;
            //获取后缀名
            $extensionName=substr(strrchr($filepath, '.'), 1);
            //拼接文件名
            $filename=$author.'-'.$type.date('mdHis').'.'.$extensionName;
            //拼接完整下载路径
            $filepath='.'.DS.'uploads'.DS.'unfinished'.DS.$filepath;//
             //检查文件是否存在
            if (! file_exists($filepath) ) {
                return 'false';
            }else{
                // 打开文件
                $file1 = fopen($filepath, "r");
                // 输入文件标签
                Header("Content-type: application/octet-stream");
                Header("Accept-Ranges: bytes");
                Header("Accept-Length:".filesize($filepath));
                Header("Content-Disposition: attachment;filename=" . $filename);
                ob_clean();     // 重点！！！
                flush();        // 重点！！！！可以清除文件中多余的路径名以及解决乱码的问题：
                //输出文件内容
                //读取文件内容并直接输出到浏览器
                echo fread($file1, filesize($filepath));
                fclose($file1);
                exit();
                return 'success';
            }
        }

    }