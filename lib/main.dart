import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() => runApp(const MaterialApp(home: GramShaktiApp()));

class GramShaktiApp extends StatefulWidget {
  const GramShaktiApp({super.key});
  @override
  State<GramShaktiApp> createState() => _GramShaktiAppState();
}

class _GramShaktiAppState extends State<GramShaktiApp> {
  late final WebViewController controller;

  @override
  void initState() {
    super.initState();
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadFlutterAsset('index.html'); 
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(child: WebViewWidget(controller: controller)),
    );
  }
}
