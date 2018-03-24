const paths = {
	img_src: './src/img/**/',
	img_dest: './dest/img/',
	img_build: './build/img/',
	img_sprite_src: './src/sprite/',
	img_sprite_dest: './src/img/',
	
	js_src: './src/js/app.js',
	js_dest: './dest/js/',
	js_build: './build/js/',
	
	stylus_src: './src/stylus/app.styl',
	stylus_dest: './dest/css/',
	stylus_build: './build/css/',
	
	pug_src: ['./src/pug/**/*.pug','!./src/pug/**/_*.pug'],
	
	yaml_src: './src/yaml/**/*.y{,a}ml',
	yaml_dest: './dest/json/',
	
	php_src: './src/php/',
	
	iconfont_src: './src/iconfont/*.svg',
	iconfont_template_src: './src/template/iconfont/',
	iconfont_template_dest: './dest/template/iconfont/',
	iconfont_stylus_dest: './src/stylus/object/component/',
	iconfont_dest: './dest/font/',
	iconfont_build: './dest/font/',
	webfont_src: './src/webfont/*.*',
	font_dest: './dest/webfont/',
	font_build: './build/font/',
	
	dest: './dest/',
	build: './build/'
};

export default paths;