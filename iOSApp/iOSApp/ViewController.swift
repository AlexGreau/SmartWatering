//
//  ViewController.swift
//  iOSApp
//
//  Created by Grace on 09/07/2018.
//  Copyright © 2018 Grace. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKUIDelegate, WKNavigationDelegate {

    @IBOutlet weak var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        loadLocalPage()
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func loadView() {
        let webConfiguration = WKWebViewConfiguration()
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.uiDelegate = self
        //webView.navigationDelegate = self
        view = webView
    }
    
    func loadPage() {
        let myUrl = URL(string: "https://www.google.com")
        let myRequest = URLRequest(url: myUrl!)
        webView.load(myRequest)
    }
    
    func loadLocalPage() {
        /*let myUrlPath = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "web")
        let myRequestUrl = URL(string: myUrlPath!)
        let myRequest = URLRequest(url: myRequestUrl!)
        webView.load(myRequest)*/
        
        let myUrlPath = Bundle.main.path(forResource: "index", ofType: "html")
        let myRequestUrl = URL(fileURLWithPath: myUrlPath!)
        let myRequest = URLRequest(url: myRequestUrl)
        webView.load(myRequest)
        
    }


}

