
import * as myExtension from '../src/extension';
import commands from '../src/commands';
import * as vscodeTestContent from 'vscode-test-content';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

chai.use( sinonChai );

const expect = chai.expect;

describe( 'copyToClipboard command', () => {
    let saveToClipboardStub;

    before(() => {
        saveToClipboardStub = sinon.stub( commands, '_saveToClipboard' );
    } );

    beforeEach(() => saveToClipboardStub.reset() );

    after(() => {
        saveToClipboardStub.restore();
    } );

    it( 'Copies whole document when selection collapsed', () => {
        return vscodeTestContent.setWithSelection( 'foo ^**bar** baz' )
            .then( textEditor => {
                commands.copyToClipboard( textEditor, null );
                expect( saveToClipboardStub ).to.be.calledOnce.and.calledWith( '<p>foo <strong>bar</strong> baz</p>\n' );
            } );
    } );

    it( 'Copies multiline document when selection collapsed', () => {
        return vscodeTestContent.setWithSelection( 'foo\nb^ar\nb' )
            .then( textEditor => {
                commands.copyToClipboard( textEditor, null );
                expect( saveToClipboardStub ).to.be.calledOnce.and.calledWith( '<p>foo\nbar\nb</p>\n' );
            } );
    } );

    it( 'Copies part of document when selection is ranged', () => {
        return vscodeTestContent.setWithSelection( 'f[oo\nbar}\nb' )
            .then( textEditor => {
                commands.copyToClipboard( textEditor, null );
                expect( saveToClipboardStub ).to.be.calledOnce.and.calledWith( '<p>oo\nbar</p>\n' );
            } );
    } );
} );

describe( '_saveToClipboard method', () => {
    before(() => {
        sinon.stub( commands._winClipboard, 'clear' );
        sinon.stub( commands._winClipboard, 'setText' );
        sinon.stub( commands._winClipboard, 'setHtml' );
    } );

    beforeEach(() => {
        commands._winClipboard.clear.reset();
        commands._winClipboard.setText.reset();
        commands._winClipboard.setHtml.reset();
    } );

    after(() => {
        commands._winClipboard.clear.restore();
        commands._winClipboard.setText.restore();
        commands._winClipboard.setHtml.restore();
    } );

    it( 'Clears existing clipboard data', () => {
        commands._saveToClipboard( 'foo' );
        expect( commands._winClipboard.clear ).to.be.calledOnce;
    } );

    it( 'Sets HTML clipboard', () => {
        commands._saveToClipboard( 'foo <b>bar</b> baz' );
        expect( commands._winClipboard.setHtml ).to.be.calledOnce.and.calledWith( 'foo <b>bar</b> baz' );
    } );

    it( 'Also sets plain text representation of HTML', () => {
        commands._saveToClipboard( 'foo <b>bar</b> baz' );
        expect( commands._winClipboard.setText ).to.be.calledOnce.and.calledWith( 'foo bar baz' );
    } );
} );