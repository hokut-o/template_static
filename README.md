# 静的ページ制作用テンプレート

## タスクランナー
* [gulp.js](https://gulpjs.com/)

## パッケージマネージャー
* [Yarn](https://yarnpkg.com/ja/)

## ライブラリ
* [jQuery](https://jquery.com/)

## json使いたい時
* [YAML](http://yaml.org/)  
`./src/yaml/data.yaml`  
pugタスクに組み込まれています。

## CSS
### 設計
[Flocss](https://github.com/hiloki/flocss)
### リセット
[ress](https://github.com/filipelinhares/ress)
### font-family
#### OSX
* 和文、英文

游ゴシック体が  
あれば：游ゴシック体  
なければ：ヒラギノ

#### Windows
* 和文、英文

ヒラギノが  
あれば：ヒラギノ  
なければ：メイリオ  
メイリオがなければ：MS Pゴシック

sans-serifは保険です。

#### Win,Mac相互で游ゴシック体を使いたかったり、英文でSanfranciscoとか別フォントを使いたい方
2020年まで使えるfont-familyおすすめゴシック体 - Qiita  
https://qiita.com/RinoTsuka/items/4181efd43d072e246519  
このあたりを参考にして頑張ろう。

### Mixin
`/src/stylus/foundation/mixin.styl` を参照。

* hover
* line-clamp
* z-index
* placeholder制御用
* spriteのレスポンシブ対応用

が組み込み済み。

## IE用ポリフィル
* [picturefill](https://github.com/scottjehl/picturefill)（picture要素表示用）
* [svg4everybody](https://github.com/jonathantneal/svg4everybody)（svg要素表示用）

## 開発時タスク
```
$ gulp
```
`$ gulp`で下記のタスクが走ります。

### pug  
* 更新したpugファイルが差分コンパイルされます
* include先のpugを更新した際にinclude元に更新分が反映されないので、include元を更新してwatchを走らせる必要があります
* `$ gulp pugAll` で全てのpugファイルをコンパイルします
* キャッシュ対策のため、CSS,JSの読み込みパスのクエリに+new Date()の値を追加しています。

### stylus
* [Rupture](https://github.com/jescalan/rupture)（メディアクエリー記述用）
* [PostCSS](https://github.com/postcss/gulp-postcss)
  * [autoprefixer](https://github.com/postcss/autoprefixer)
  * [css-mqpacker](https://github.com/hail2u/node-css-mqpacker)（メディアクエリソート用）
* ソースマップ生成

### webpack
* javascriptのモジュールバンドル
* babelでES6　→　ES5へのコンパイル
* ソースマップ生成

### Browsersync
* ローカルサーバー
* PHP組み込み時はproxyオプションを使用

## アイコンフォント生成
```
$ gulp iconfont
```

### font
`./src/iconfont/*.svg`　→　`./dest/font/`に出力されます

### css
`./src/stylus/object/component/icon.styl` に出力されます。  
※キャッシュ対策にフォントファイル読み込みパスのクエリに+new Date()の値を追加しています。

### template
`./dest/template/iconfont/` にアイコンフォントの一覧が出力されます

## WebFontサブセット化
```
$ gulp webfont
```
`./src/webfont/*.ttf`　→ `./dest/webfont/` に出力されます。  
otf　→　ttf　は行っていないので、必要であれば  
https://github.com/HAKASHUN/manabi/blob/master/src/content/posts/2015/font.md
このあたりを参考にタスクに組み込んでみてください。


## PNGスプライト生成
```
$ gulp spritePng
```
`./src/sprite/*.png`　→ `./dest/img/sprite.png`
に画像が出力されます。  
`./src/stylus/object/component/sprite.styl`
にstylusが出力されます。


## SVGスプライト生成
```
$ gulp spriteSvg
```
`/src/sprite/*.svg`　→ 　`/src/img/sprite.svg`に出力されます。

### template

`/dest/template/svg/` にSVGスプライトの一覧が出力されます


## SVGスプライト（インライン）生成

```
$ gulp spriteSvgInline
```

### template

`/dest/template/svgsprite-inline` に組込み用のpugファイルが出力されます


## favicon生成

- [Favicon Generator for Gulp](https://realfavicongenerator.net/favicon/gulp#.XEg9nc_7Qsk) でgulpのタスクとfaviconData.json（設定ファイル）が生成できるので、それをタスクを`favicon.js`にペースト、faviconData.jsonをルートのものに上書き。

```
$ gulp favicon
```

`/src/template/favicon/favicon.pug`にテンプレートが生成され、

`/src/img/favicon`に画像、xml、webmanifestが生成されます。


## デプロイ用タスク
```
$ gulp build
```
`/build/` 以下に

* `src/pug` から コンパイルされたhtml
* `src/img` から 圧縮されたイメージ
* `src/stylus` からコンパイル・ミニファイされたcss
* `src/js` からバンドル・ミニファイされたjavascript
* svg、fontファイルのコピー

が生成されます。
