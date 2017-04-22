
import * as myExtension from '../src/extension';
import commands from '../src/commands';
import * as vscodeTestContent from 'vscode-test-content';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

chai.use( sinonChai );

const expect = chai.expect;

// Defines a Mocha test suite to group tests of similar kind together
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