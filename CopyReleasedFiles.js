var op = "m:\\"; // note: Be sure to change this for you, where compressed output file is copied to
var names = ["FreeImage.dll", "JBig2.dll", "mupdflib.dll", "PDFPatcher.exe", "PDFPatcher.exe.config", "��ȨЭ��.txt", "������ʷ.txt"];

var n = WScript.Arguments(0); // assembly info file path
var p = WScript.Arguments(1); // bin path
var s = new ActiveXObject("ADODB.Stream");
	s.Open();
	s.Type = 2;
	s.CharSet = "UTF-8"; // Make sure that the encoding is correct, otherwise damage may occur
	s.LoadFromFile (n);
var t = s.ReadText ();
	s.Close();
var r = /\[assembly: AssemblyFileVersion\s*\("(\d+\.\d+\.\d+\.\d+)"\)\]/g;
var a = r.exec(t);
var v;
if (a != null && a.length > 1) {
	v = a[1]; // Major.Minor.Build.Revision
}
else {
	WScript.StdErr.WriteLine ("Error: AssemblyFileVersion not found.");
	WScript.Quit (1);
}

var sh = WScript.CreateObject ("WScript.Shell");
sh.CurrentDirectory = p;
	s.Open();
	s.Type = 2;
	s.CharSet = "UTF-8";
	s.LoadFromFile ("������ʷ.txt");
	t = s.ReadText ();
	r = /\d+\.\d+\.\d+\.\d+ \d+��\d+��\d+��/;
	s.Position = 0;
	var d = new Date();
	var dt = d.getYear() + "��" + (d.getMonth()+1)+"��"+d.getDate()+"��";
	s.WriteText (t.replace(r, v + " " + dt));
	s.SetEOS ();
	s.SaveToFile ("������ʷ.txt", 2);
	s.Close();

	s.Open();
	s.Type = 2;
	s.CharSet = "UTF-8";
	s.LoadFromFile ("������ʷ.txt");
	t = s.ReadText ();
	s.Position = 0;
	s.SetEOS ();
	s.WriteText ('<?xml version="1.0" encoding="gbk"?><PDFPatcher');
	s.WriteText (' version="' + v + '" date="' + dt + '"');
	s.WriteText (' url="https://z701.com/d/12751606-24910846-996057/"');
	s.WriteText ('>');
	s.WriteText ('<content><![CDATA[�������룺8518\r\n\r\n');
	var tl = t.split("\r\n");
	for (var i=1; i<tl.length; i++) {
		if (tl[i].length == 0) {
			break;
		}
		s.WriteText (tl[i]+"\r\n");
	}
	s.WriteText (']]></content></PDFPatcher>');
	s.SaveToFile (op + "pdfpatcher.update.xml", 2);
	s.Close();

var c = "..\\..\\7za.exe u "+op+"PDFPatcher."+v+".7z "+names.join(" ") + " -mx9";
WScript.StdOut.WriteLine (c);
var z = sh.exec(c);
var i = 0;
while ((z.Status == 0 && i < 50) || z.StdOut.AtEndOfStream == false) {
	WScript.Sleep (100);
	i++;
	if (!z.StdOut.AtEndOfStream) {
		WScript.StdOut.Write (z.StdOut.ReadAll());
	}
}
