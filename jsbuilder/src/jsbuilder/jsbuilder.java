package jsbuilder;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class jsbuilder {

	/** 開発中フラグ */
	final static private boolean IS_DEV = false;
	
	/**
	 * 引数の想定書式
	 * -java:/usr/bin/java -closure:compiler.jar -out:../../static/js/app.js  -dir:../js -file:../../static/js/test.js
	 * @param args
	 */
	public static void main(String[] args) {

		String opt = "";
		if(IS_DEV){
			opt = "../taipengin/_dev/_conf/";
		}
		
		String java = null;
		String closure = null;
		String outer = null;
		List<String> folders = new ArrayList<String>();
		List<String> files = new ArrayList<String>();
		
		// 引数解析
        for (String arg : args) {
            String[] param = arg.split(":");
            String option = param[0];
            String data = opt + param[1];
            
            // compiler.jar
            if ("-java".equals(option)) {
            	java = param[1];
            }
            else if ("-closure".equals(option)) {
            	closure = data;
            // 出力先
            } else if ("-out".equals(option)) {
            	outer = data;
            // 読み込みディレクトリ
            } else if ("-dir".equals(option)) {
            	folders.add(data);
            // 読み込みファイル
            } else if ("-file".equals(option)) {
            	files.add(data);
            } else {
            	System.err.println("引数指定の誤り：未知の引数が指定されました");
            	return;
            }
        }
        
        // param check.
        if(closure == null){
        	System.err.println("引数指定の誤り：-binが指定されていません");
        	return;
        }else if(outer == null){
        	System.err.println("引数指定の誤り：-outが指定されていません");
        	return;
        }else if(folders.isEmpty() && files.isEmpty()){
        	System.err.println("引数指定の誤り：-dirか-fileが指定されていません");
        	return;
        }
        
        jsbuilder exe = new jsbuilder();
        try {
			exe.doExe(java, closure, outer, folders, files);
		} catch (IOException e) {
        	System.err.println("エクセプションが発生しました");
		} catch (InterruptedException e) {
        	System.err.println("エクセプションが発生しました");
		}
	}
	
	/** ビルド実行 */
	private void doExe(String aJava, String aClosure, String aOuter, List<String> aFolders, List<String> aFiles) throws IOException, InterruptedException{
		
		List<String> list = new ArrayList<String>();
		// Closure Compiler jar実行指定
		list.add(aJava);
		list.add("-jar");
		list.add(aClosure);
		// ファイルを追加
		for(String file: aFiles){
			list.add("--js");
			list.add(file);
		}
		// フォルダを再帰的に検索してjsファイルを追加
		for(String folder: aFolders){
			FileSearch search = new FileSearch();
			File[] files = search.listFiles(folder, "*.js");
			for(File file:files){
				list.add("--js");
				list.add(file.getAbsolutePath());
			}
		}
		// 出力ファイル指定
		list.add("--js_output_file");
		list.add(aOuter);
		
		// jarプロセス実行
		doProcess(list);
	}
	

	/** 外部プロセス実行 */
	private void doProcess(List<String> aParam) throws IOException, InterruptedException{
		
		ProcessBuilder builder = new ProcessBuilder(aParam);

		Process p = builder.start();

		//InputStreamのスレッド開始
		InputStreamThread it = new InputStreamThread(p.getInputStream());
		InputStreamThread et = new InputStreamThread(p.getErrorStream());
		it.start();
		et.start();

		//プロセスの終了待ち
		p.waitFor();

		//InputStreamのスレッド終了待ち
		it.join();
		et.join();

		System.out.println("");
		System.out.println("戻り値：" + p.exitValue());

		//標準出力の内容を出力
		for (String s : it.getStringList()) {
			System.out.println(s);
		}
		//標準エラーの内容を出力
		for (String s : et.getStringList()) {
			System.err.println(s);
		}
		
		System.out.println("jsbuilder終了");
	}
}
