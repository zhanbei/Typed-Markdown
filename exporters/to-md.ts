'use strict';

import {IMdBlock, IMdCodeBlock, IMdDocument, IMdSection} from '../types/docs';

const mdCodeBlock = (block: IMdCodeBlock): string => {
	return '```' + block.syntax + '\n' + block.content + '\n```';
};

const mdBlock = (block: IMdBlock): string => {
	if (typeof block === 'string') {return block;}
	switch (block.type) {
		case 'code':
			return mdCodeBlock(block);
		case 'list':
		default:
			return 'Unsupported block type!';
	}
};

const toMd = (doc: IMdSection): string => {
	const parts: string[] = [];
	parts.push(`${'#'.repeat(doc.level)} ${doc.title}`);
	if (doc.comment) {parts.push(`<!-- ${doc.comment} -->`);}
	if (doc.descriptions) {parts.push(doc.descriptions.join('\n'));}
	if (doc.contents) {parts.push(doc.contents.map(mdBlock).join('\n'));}
	if (doc.children) {doc.children.map(section => parts.push(toMd(section)));}
	return parts.join('\n\n');
};


export const mdRenders = {
	mdBlock,
	mdCodeBlock,
	mdSection: toMd,
};
export const mdDocument = (doc: IMdDocument): string => toMd(doc);
