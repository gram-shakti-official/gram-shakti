import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() => runApp(const MaterialApp(home: GramShakti(), debugShowCheckedModeBanner: false));

class GramShakti extends StatefulWidget {
  const GramShakti({super.key});
  @override
  State<GramShakti> createState() => _GramShaktiState();
}

class _GramShaktiState extends State<GramShakti> {
  late final WebViewController controller;
  @override
  void initState() {
    super.initState();
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadRequest(Uri.parse('https://gram-shakti-official.github.io/gram_shakti/'));
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(body: SafeArea(child: WebViewWidget(controller: controller)));
  }
}
