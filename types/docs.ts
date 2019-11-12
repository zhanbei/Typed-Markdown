'use strict';

export type IMdHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface IMdSection {
	title: string;
	// The header level(2/3/4/5/6).
	level: IMdHeadingLevel;
	comment?: string;
	descriptions?: string[];
	contents?: IMdBlock[];
	children?: IMdSection[];
}

export const newMdSection = (level: IMdHeadingLevel, title: string, contents?: IMdBlock[], children?: IMdSection[]): IMdSection => ({title, level, contents, children});
export const newMdHeading2 = (title: string, contents?: IMdBlock[], children?: IMdSection[]): IMdSection => newMdSection(2, title, contents, children);

export interface IMdDocument extends IMdSection {
	level: 1;
}

export const newMdDocument = (title: string, section?: IMdSection[], description?: string, comment?: string): IMdDocument => ({
	title, level: 1, comment,
	descriptions: description ? [description] : undefined,
	children: section,
});

export type IMdBlockType = 'list' | 'code'
export type IMdBlock = string | IMdCodeBlock

export interface IMdCodeBlock {
	type: IMdBlockType;
	syntax: string;
	content: string;
}

export const newMdCodeBlock = (syntax: string, content: string): IMdCodeBlock => ({syntax, content, type: 'code'});
