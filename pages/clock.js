import Page from '../OvO/view/Page.js';
import Model, { $, } from '../OvO/model/Model.js';
import { ForEach, } from '../OvO/view/Ctrl.js';
import HTML, { main, section, div, span, } from '../OvO/view/HTML.js';

export default new Page( {
	
	name: 'home',
	
	render()
	{
		const now= new Model( { time:0, day:0, hour:0, minu:0, seco:0, }, );
		
		now.moonPhase= now.time.$( t=> ((t - 0x16101E7BD60)/0x9813EE20)*2*Math.PI, );
		now.cosPhase= now.moonPhase.$( ph=> Math.cos( ph, ), );
		now.sinPhase= now.moonPhase.$( ph=> Math.sin( ph, ), );
		
		(run=> { setInterval( run, 1000, ); run(); })( run.bind( now, ), )
		
		return [
			
			HTML.title( 'Fenz Clock', ),
			
			main(
				{ class:'clock', },
				section(
					{ class:'stars', },
					range( 0x0, 0x7, ).map( i=> div( { class: now.day.$( d=> i===d?'actived' :'', ), }, ), ),
				),
				section(
					{ class:'minutes', },
					range( 0x0, 0x3C, ).map( i=> span(
						{ style:`transform:rotate(${i*0x6}deg) rotate(0.5turn);`, },
						i,
					), ),
				),
				section(
					{ class:'hours', },
					range( 0x0, 0x18, ).map( i=> span(
						{ style:`transform:rotate(${i*0xF}deg) rotate(0.5turn);`, },
						i,
					), ),
				),
				section(
					{ class:'zodiacs', },
					[ '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', ].map( ( v, i, )=> span(
						{ style:`transform:rotate(${i*0x1E}deg) rotate(-75deg);`, },
						v,
					), ),
				),
				section(
					{ class:'solarterms', },
					[
						'冬至', '小寒', '大寒', '立春', '雨水', '驚蟄', '春分', '清明', '穀雨', '立夏', '小滿', '芒種',
						'夏至', '小暑', '大暑', '立秋', '處暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪'
					].map( ( v, i, )=> span(
						{ style:`transform:rotate(${i*0xF}deg) rotate(0.5turn);`, },
						v,
					), ),
				),
				section(
					{ class:'moon-phases', },
					range( 0x0, 0x1E, ).map( i=> span(
						{ style:`transform:rotate(${i*0xC}deg) rotate(0.5turn);`, },
						'│',
					), ),
				),
				section(
					{ class:'moon-phase-titles', },
					span(
						'朔',
					),
					span(
						{ style:'transform:rotate(0.25turn);', },
						'上弦',
					),
					span(
						{ style:'transform:rotate(0.5turn);', },
						'望',
					),
					span(
						{ style:'transform:rotate(0.75turn);', },
						'下弦',
					),
				),
				div(
					{ class:'title', },
					'Fenz',
				),
				div(
					{ class:'solarterm', style:{
						transform: now.time.$( ( t, )=> `rotate(${(t-0x167D2DCFFB0)/0x758F07A30}turn)`, ),
					}, },
				),
				div(
					{
						class: $( ( c, s, )=> [ 'moon', ...(c<0?[ 'open-pupilla', ]: []), ...(s<0?[ 'open-right', ]: []), ], now.cosPhase, now.sinPhase, ),
						style: {
							'--phase': now.moonPhase,
							'--abs-cos-phase': now.cosPhase.$( x=> Math.abs( x, ), ),
							'--sin-phase': now.sinPhase,
						},
					},
				),
				div(
					{ class:'hour', style:{
						transform: $( ( h, m, s, )=> `rotate(${h/0x18 - - m/0x5A0 - - s/0x15180}turn)`, now.hour, now.minu, now.seco, ),
					}, },
				),
				div(
					{ class:'minute', style:{
						transform: $( ( m, s, )=> `rotate(${now.minu/0x3C - - now.seco/0xE10}turn)`, now.minu, now.seco, ),
					}, },
				),
				div(
					{ class:'second', style:{
						transform: now.seco.$( ( s, )=> `rotate(${s/0x3C}turn)`, ),
					}, },
				),
			),
		];
	},
	
}, );

function range( min, max, )
{
	return Array.from( (function*( i, l, ){ while( i<l ) yield i++; })( min, max, ), );
}

function run()
{
	const now= new Date();
	
	this.time= now.getTime();
	this.day= now.getDay();
	this.hour= now.getHours();
	this.minu= now.getMinutes();
	this.seco= now.getSeconds();
}
